import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const CreateJob = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/jobs", { company, position });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gray-900 text-white">
            <PlusCircle className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold">Create Job</h1>
        </div>
        {error && <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Company</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-gray-300 focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Position</label>
            <input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-gray-300 focus:ring-2"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-gray-900 px-4 py-2.5 font-medium text-white shadow hover:bg-black">
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;