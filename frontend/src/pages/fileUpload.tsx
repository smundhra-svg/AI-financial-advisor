import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { axiosClient } from "../api/axiosClient";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "completed">("idle");
  const [inserted, setInserted] = useState<number | null>(null);

  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = e.target.files[0];
    if (selected.type !== "text/csv") {
      alert("Only CSV files are allowed");
      return;
    }

    setFile(selected);
    setInserted(null);
    setStatus("idle");
  };

  const simulateProgress = () => {
    let value = 0;
    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 12) + 5;
      if (value >= 95) {
        clearInterval(interval);
      }
      setProgress(Math.min(value, 95));
    }, 400);
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setProgress(0);
    simulateProgress();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/upload",
        formData
      );

      setProgress(100);
      setInserted(res.data.inserted);
      setStatus("completed");
      console.log(res.data);
    } catch (err) {
      alert("Upload failed");
      setStatus("idle");
    }
  };

    const handleGenerateAnalysis = async () => {
      try {
        await axiosClient.get("/analyze"); // explicitly trigger analysis
        navigate("/dashboard");
      } catch (err) {
        alert("Failed to generate analysis. Please try again.");
      }
    };

  return (
    <div className="min-h-screen bg-foreground text-cyan-500 flex flex-col ">
      {/* Header */}
      
      <header className="px-8 py-6 border-b border-sidebar-border flex flex-col items-center">
        <h1 className="text-2xl font-semibold">
          AI Bank Statement Analyzer
        </h1>
        <p className="text-sm text-gray-400">
          Upload CSV bank statements for automated insights
        </p>
      </header>
    
      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-xl bg-gunmetalLight rounded-xl p-6 shadow-lg border border-cyan-200">
          {/* File Input */}
          <label className="block mb-4 text-sm font-medium">
            Upload CSV File
          </label>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:bg-cyanBlue file:text-shadow-cyan-200
              hover:file:bg-sky-400
              cursor-pointer
              "
          />

          {/* Selected File */}
          {/* {file && (
            <div className="mt-3 text-sm text-gray-300">
              Selected file:{" "}
              <span className="text-cyanBlue font-medium">
                {file.name}
              </span>
            </div>
          )} */}

          {/* Upload Button */}
          {file && status === "idle" && (
            <button
              onClick={handleUpload}
              className="mt-6 w-full bg-cyanBlue text-gray-600 py-2 rounded font-semibold hover:bg-sky-400 transition"
            >
              Parse & Upload
            </button>
          )}

          {/* Progress */}
          {status === "uploading" && (
            <div className="mt-6">
              <div className="mb-2 text-sm text-gray-300">
                Parsing and storing transactions...
              </div>
              <div className="w-full bg-gunmetal rounded-full h-3">
                <div
                  className="bg-cyanBlue h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-gray-400">
                {progress}%
              </div>
            </div>
          )}

          {/* Completed */}
          {status === "completed" && (
            <div className="mt-6">
              <p className="text-green-400 text-sm mb-4">
                {inserted} transactions parsed and stored successfully
              </p>

              <button
              onClick={()=> navigate('/dashboard')}
                className="w-full bg-cyanBlue text-black py-2 rounded font-semibold hover:bg-sky-400 transition"
              >
                Generate Analysis
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default FileUpload;
