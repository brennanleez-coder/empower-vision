import React, { useState, useEffect, useDeferredValue } from "react";
import Modal from "./Modal";

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
    <div className="p-2">
      <input
        type="text"
        placeholder="Search results..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <div
              key={result.id}
              className={`p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out ${
                result.pass_fail === "PASSED"
                  ? "bg-green-100 shadow-md hover:shadow-lg"
                  : "bg-red-100 shadow-md hover:shadow-lg"
              }`}
              onClick={() => handleShowResult(result)}
            >
              <h3 className="text-lg font-bold">{result.type}</h3>
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
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{selectedResult.type}</h2>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <p><strong>Date:</strong> {selectedResult.date}</p>
                <p><strong>Pass/Fail:</strong> {selectedResult.pass_fail}</p>
                <p><strong>Counter:</strong> {selectedResult.counter}</p>
                <p><strong>Elapsed Time:</strong> {selectedResult.elapsed_time.toFixed(2)} seconds</p>
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <p><strong>Rep Durations:</strong></p>
                <ul className="list-disc list-inside">
                  {selectedResult.rep_durations.map((duration, index) => (
                    <li key={index}>{duration.toFixed(2)} seconds</li>
                  ))}
                </ul>
                <p><strong>Max Angles:</strong></p>
                <ul className="list-disc list-inside">
                  {selectedResult.max_angles.map((angle, index) => (
                    <li key={index}>{angle.toFixed(2)}°</li>
                  ))}
                </ul>
                <p><strong>Violations:</strong></p>
                <ul className="list-disc list-inside">
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
