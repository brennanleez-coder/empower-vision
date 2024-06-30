"use client";
import React, { useState } from "react";
import axios from "axios";

const ProcessVideo: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      console.log(file);
    }
  };

  const handleProcessVideo = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post("http://your-api-url/video_processing", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        setMessage(response.data.message);
        console.log("Processing started:", response.data.message);

        // Poll for results
        pollForResult();
      } catch (error) {
        console.error("Error processing video:", error);
        setMessage("Error processing video");
      }
    }
  };

  const pollForResult = async () => {
    try {
      const response = await axios.get("http://your-api-url/video_result");
      if (response.status === 202) {
        // Processing is still ongoing
        setTimeout(pollForResult, 2000); // Poll every 2 seconds
      } else if (response.status === 200) {
        // Processing completed
        setResult(response.data);
        setMessage("Processing completed");
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      setMessage("Error fetching result");
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setMessage(null);
    setResult(null);
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
      {message && (
        <p className="mt-4 text-gray-700">{message}</p>
      )}
      {result && (
        <div className="mt-4 p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Result</h2>
          <pre className="mt-2 bg-gray-100 p-2 rounded">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ProcessVideo;
