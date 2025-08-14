import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { JobsProvider } from "./contexts/JobsContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";

export default function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/"]; // pages where Navbar is hidden

  return (
    <AuthProvider>
      <JobsProvider>
        <div className="min-h-screen bg-gray-100 font-sans">
          {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
            </Route>
          </Routes>
        </div>
      </JobsProvider>
    </AuthProvider>
  );
}
