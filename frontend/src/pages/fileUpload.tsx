import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { axiosClient } from "../api/axiosClient";
import { Shield, TrendingUp ,Zap } from "lucide-react";

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
        navigate("/transactions");
      } catch (err) {
        alert("Failed to generate analysis. Please try again.");
      }
    };

  return (
    
    <div className="min-h-screen bg-primary text-cyan-500 flex flex-col justify-center items-center">
      {/* Header */}
      {/* Background gradient effects */}
    <div className="absolute inset-0 gradient-radial pointer-events-none" />
    <div className="absolute top-0 left-1/5 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/6 w-96 h-96 bg-cyan-300/5 rounded-full blur-3xl" />

       <div className="relative z-10 w-full px-4 py-16 max-w-2xl mx-auto space-y-10 mb-10">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-cyan-300">
            <Zap className="w-4 h-4 text-cyan-400 text-glow-success" />
            <span className="text-sm font-medium text-cyan-400">AI-Powered Analysis</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">Smart </span>
            <span className="text-gradient text-cyan-300">Statement Analyzer</span>
          </h1>
        </header>
        </div>
    
      {/* Main */}
      <main className="flex items-center justify-center px-6 ">
        <div>
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
              onClick={()=> navigate('/transactions')}
                className="w-full bg-cyan-800 text-black py-2 rounded font-semibold hover:bg-cyan-300 transition"
              >
                Launch Editing
              </button>
            </div>
          )}

        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-border">
            <Shield className="w-4 h-4 text-green-600  text-glow-success" />
            <span className="text-sm text-white">Bank-level Security</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800  border border-border">
            <TrendingUp className="w-4 h-4 text-cyan-300"/>
            <span className="text-sm text-white">Spending Insights</span>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

export default FileUpload;
