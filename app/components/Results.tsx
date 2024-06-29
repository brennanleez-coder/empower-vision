import React, { useState, useDeferredValue } from "react";
import Modal from "./Modal";

type ResultType = {
  id: number;
  type: string;
  date: string;
};
const resultsData: ResultType[] = [
  { id: 1, type: "5 Rep Sit Stand", date: "2024-06-28 14:30" },
  { id: 2, type: "TUG", date: "2024-06-29 10:00" },
];

const Results = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // Use deferred value for debouncing the search term
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredResults = resultsData.filter((result) =>
    result.type.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  );

  const handleShowResult = (result: number) => {
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
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="bg-gray-100/80 shadow-md p-4 rounded-lg  hover:shadow-xl cursor-pointer transition duration-300 ease-in-out"
            onClick={() => handleShowResult(result.id)}
          >
            <h3 className="text-lg font-bold">{result.type}</h3>
            <p className="text-gray-600">{result.date}</p>
          </div>
        ))}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <p>Modal content</p>
      </Modal>
    </div>
  );
};

export default Results;
