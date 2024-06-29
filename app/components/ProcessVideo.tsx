"use client";
import React, { useState } from "react";
import axios from "axios";

const ProcessVideo: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      console.log(file);
    }
  };

  const handleProcessVideo = () => {
    if (selectedFile) {
      // Add your video processing logic here
      console.log("Processing video:", selectedFile);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-gray-50 shadow-lg rounded-lg">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <input
          type="file"
          accept=".mp4,.mov"
          onChange={handleFileUpload}
          className="p-4 rounded-lg w-full border border-gray-300 outline-none"
        />
        <select
          id="category"
          name="category"
          className="p-4 rounded-lg border border-gray-300 outline-none"
        >
          <option>5 Sit Stand</option>
        </select>
      </div>
      {selectedFile && (
        <div className="mt-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <p className="text-sm text-gray-700 flex-grow">Selected File: {selectedFile.name}</p>
          <div className="flex space-x-2">
            <button
              onClick={handleClearFile}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Clear File
            </button>
            <button
              onClick={handleProcessVideo}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Process Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessVideo;
