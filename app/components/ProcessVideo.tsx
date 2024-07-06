"use client";
import React, { useState } from "react";
import axios from "axios";

const ProcessVideo: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

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
      setLoading(true);

      try {
        const response = await axios.post("http://3.84.91.206/api/video_processing", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        setMessage(response.data.message);
        setRequestId(response.data.request_id);
        console.log("Processing started:", response.data.message);
        console.log("Request ID:", response.data.request_id);
        // Poll for results
        pollForResult(response.data.request_id);
      } catch (error) {
        console.error("Error processing video:", error);
        setMessage("Error processing video");
        setLoading(false);
      }
    }
  };

  const pollForResult = async (requestId: string) => {
    try {
      const response = await axios.get(`http://3.84.91.206/api/video_result/${requestId}`);
      if (response.status === 202) {
        // Processing is still ongoing
        setTimeout(() => pollForResult(requestId), 2000); // Poll every 2 seconds
      } else if (response.status === 200) {
        // Processing completed
        console.log(response.data)
        setResult(response.data);
        setMessage("Processing completed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      setMessage("Error fetching result");
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setMessage(null);
    setResult(null);
    setRequestId(null);
    setLoading(false);
    setSavedMessage(null);
  };

  const handleSaveResult = () => {
    if (result) {
      const storedResults = localStorage.getItem("results");
      const resultsArray = storedResults ? JSON.parse(storedResults) : [];
      resultsArray.push(result);
      localStorage.setItem("results", JSON.stringify(resultsArray));
      setSavedMessage("Result saved to local storage.");
      handleClearFile();
    }
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
              disabled={loading}
            >
              {loading ? "Processing..." : "Process Video"}
            </button>
          </div>
        </div>
      )}
      {loading && (
        <div className="mt-4 flex justify-center items-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
          <p className="ml-2 text-gray-700">Processing your video...</p>
        </div>
      )}
      {message && (
        <p className="mt-4 text-gray-700">{message}</p>
      )}
      {result && (
        <div className="mt-4 p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800">Result</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded ${result.counter === 5 ? 'bg-green-100' : 'bg-gray-100'}`}>
                <h3 className="font-medium text-gray-800">Counter</h3>
                <p className="text-gray-700">{result.counter}</p>
              </div>
              <div className={`p-4 rounded ${result.elapsed_time < 12 ? 'bg-green-100' : 'bg-gray-100'}`}>
                <h3 className="font-medium text-gray-800">Elapsed Time</h3>
                <p className="text-gray-700">{result.elapsed_time.toFixed(2)} seconds</p>
              </div>
              <div className={`p-4 rounded ${result.violations.length === 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
                <h3 className="font-medium text-gray-800">Violations</h3>
                {result.violations.length > 0 ? (
                  <ul className="list-disc ml-4 text-gray-700">
                    {result.violations.map((violation: any, index: number) => (
                      <li key={index}>{violation}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">No violations</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-medium text-gray-800">Rep Durations</h3>
                <ul className="list-disc ml-4 text-gray-700">
                  {result.rep_durations.map((duration: number, index: number) => (
                    <li key={index}>{duration.toFixed(2)} seconds</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-medium text-gray-800">Max Angles</h3>
                <ul className="list-disc ml-4 text-gray-700">
                  {result.max_angles.map((angle: number, index: number) => (
                    <li key={index}>{angle.toFixed(2)} degrees</li>
                  ))}
                </ul>
              </div>
              <div className={`p-4 rounded ${result.pass_fail === 'pass' ? 'bg-green-100' : 'bg-red-100'}`}>
                <h3 className="font-medium text-gray-800">Pass/Fail</h3>
                <p className="text-gray-700">{result.pass_fail}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleSaveResult}
            className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 w-full md:w-auto"
          >
            Save Result to Local Storage
          </button>
          {savedMessage && (
            <p className="mt-2 text-green-700">{savedMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcessVideo;
