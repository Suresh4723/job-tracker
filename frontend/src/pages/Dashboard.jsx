// src/pages/Dashboard.jsx
import { useJobs } from "../contexts/JobsContext";
import JobCard from "../components/jobCard";
import JobForm from "../components/JobForm";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const { jobs, addJob, updateJob, deleteJob, loading, error } = useJobs();
  const [selected, setSelected] = useState(null);
  const location = useLocation();

  // When navigated from JobDetails with editJob
  useEffect(() => {
    if (location.state?.editJob) {
      setSelected(location.state.editJob);
    }
  }, [location.state]);

  const handleCancelEdit = () => {
    setSelected(null);
  };

  const handleUpdateJob = (id, updatedData) => {
    updateJob(id, updatedData);
    setSelected(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900">
        Your Job Applications
      </h2>

      <div className="mb-8">
        <JobForm
          initial={selected}
          onSubmit={selected ? handleUpdateJob : addJob}
          onCancel={handleCancelEdit}
        />
      </div>

      {loading ? (
        <div className="py-20"><div className="loader" /></div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
