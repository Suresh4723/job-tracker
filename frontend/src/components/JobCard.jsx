// src/components/JobCard.jsx
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    interview: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800",
  };

  return (
    <div
      onClick={() => navigate(`/jobs/${job._id}`)}
      className="flex flex-col p-5 mb-4 bg-white rounded-lg shadow-md border hover:shadow-xl hover:-translate-y-1 transition transform cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-lg text-blue-800">{job.position}</div>
          <div className="text-gray-600">{job.company}</div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColors[job.status]}`}
        >
          {job.status}
        </span>
      </div>
    </div>
  );
}
