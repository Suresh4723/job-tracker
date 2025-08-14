import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setCompany(data.company);
        setPosition(data.position);
        setStatus(data.status);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load job");
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.put(`/jobs/${id}`, { company, position, status });
      navigate(`/jobs/${id}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gray-900 text-white">
            <Pencil className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold">Edit Job</h1>
        </div>
        {error && <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Company</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} required className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-gray-300 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Position</label>
            <input value={position} onChange={(e) => setPosition(e.target.value)} required className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-gray-300 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none ring-gray-300 focus:ring-2">
              <option value="pending">pending</option>
              <option value="interview">interview</option>
              <option value="declined">declined</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-gray-900 px-4 py-2.5 font-medium text-white shadow hover:bg-black">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;