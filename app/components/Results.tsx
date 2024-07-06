import React, { useState, useEffect, useDeferredValue } from "react";
import Modal from "@components/Modal";

type ResultType = {
  id: number;
  type: string;
  date: string;
  pass_fail: string;
  counter: number;
  elapsed_time: number;
  rep_durations: number[];
  violations: string[];
  max_angles: number[];
};

const Results = () => {
  const [results, setResults] = useState<ResultType[]>([]);
  const [selectedResult, setSelectedResult] = useState<ResultType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // Use deferred value for debouncing the search term
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    // Retrieve results from localStorage or initialize with an empty collection
    const storedResults = localStorage.getItem("results");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      setResults([]);
    }
  }, []);

  const filteredResults = results.filter((result) =>
    result?.type?.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  );

  const handleShowResult = (result: ResultType) => {
    setSelectedResult(result);
    setOpenModal(true);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <input
        type="text"
        placeholder="Search results..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-4 rounded-md w-full mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <div
              key={result.id}
              className={`p-6 rounded-lg cursor-pointer transition duration-300 ease-in-out shadow-md hover:shadow-lg ${
                result.pass_fail === "PASSED"
                  ? "bg-green-100 border border-green-200"
                  : "bg-red-100 border border-red-200"
              }`}
              onClick={() => handleShowResult(result)}
            >
              <h3 className="text-lg font-bold text-gray-800">{result.type}</h3>
              <p className="text-gray-600">{result.date}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No results found.
          </div>
        )}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        {selectedResult && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedResult.type}</h2>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <p className="text-gray-700"><strong>Date:</strong> {selectedResult.date}</p>
                <p className="text-gray-700"><strong>Pass/Fail:</strong> {selectedResult.pass_fail}</p>
                <p className="text-gray-700"><strong>Counter:</strong> {selectedResult.counter}</p>
                <p className="text-gray-700"><strong>Elapsed Time:</strong> {selectedResult.elapsed_time.toFixed(2)} seconds</p>
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <p className="text-gray-700"><strong>Rep Durations:</strong></p>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedResult.rep_durations.map((duration, index) => (
                    <li key={index}>{duration.toFixed(2)} seconds</li>
                  ))}
                </ul>
                <p className="text-gray-700"><strong>Max Angles:</strong></p>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedResult.max_angles.map((angle, index) => (
                    <li key={index}>{angle.toFixed(2)}°</li>
                  ))}
                </ul>
                <p className="text-gray-700"><strong>Violations:</strong></p>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedResult.violations.length > 0 ? (
                    selectedResult.violations.map((violation, index) => (
                      <li key={index}>{violation}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Results;
