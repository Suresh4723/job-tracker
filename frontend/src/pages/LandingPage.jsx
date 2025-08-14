import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function LandingPage() {
  return (
    <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4">
        <h1 className="flex items-center gap-2 font-bold text-2xl">
          <Briefcase size={28} />
          Job Application Tracker
        </h1>
        <div className="flex gap-4">
          <Link to="/login" className="bg-white text-blue-900 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
            Login
          </Link>
          <Link to="/register" className="bg-yellow-400 text-blue-900 px-4 py-2 rounded shadow hover:bg-yellow-300 transition">
            Register
          </Link>
        </div>
      </header>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-5xl font-extrabold leading-tight mb-6">
          Organize Your Job Hunt <br /> Like a Pro.
        </h2>
        <p className="text-lg text-gray-100 max-w-2xl mb-8">
          Track your job applications, monitor interviews, and never miss an opportunity.  
          The ultimate Job Application Tracker to boost your career.
        </p>
        <Link to="/register" className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition text-lg font-semibold">
          Get Started
        </Link>
      </div>
    </section>
  );
}
