// src/pages/JobDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useJobs } from "../contexts/JobsContext";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteJob } = useJobs();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/jobs/${id}`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(() => navigate("/dashboard"));
  }, [id, navigate]);

  if (loading) return <div className="py-28"><div className="loader" /></div>;

  if (!job) return <div className="text-center py-20">Job not found</div>;

  const handleDelete = async () => {
    await deleteJob(job._id);
    navigate("/dashboard");
  };

  const handleEdit = () => {
    navigate("/dashboard", { state: { editJob: job } });
  };

  return (
    <div className="page-container mt-10 max-w-3xl bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-4xl font-extrabold mb-4">{job.position}</h1>
      <p className="text-lg mb-2">
        <span className="font-semibold">Company:</span> {job.company}
      </p>
      <span
        className={`inline-block px-4 py-1 rounded-full capitalize ${
          job.status === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : job.status === "interview"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {job.status}
      </span>
      <p className="mt-4 text-sm text-gray-500">
        Created on: {new Date(job.createdAt).toLocaleDateString()}
      </p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleEdit}
          className="btn-primary"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="btn-secondary bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn-secondary"
        >
          Back
        </button>
      </div>
    </div>
  );
}
