
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Navigation from "./components/Navigation";
import AddJob from "./components/AddJob";
import EditJob from "./components/EditJob";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails";
import Candidates from "./components/Candidates";
import CandidateDetails from "./components/CandidateDetails";
import NewCandidate from "./components/NewCandidate";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/dashboard">Dashboard</Link>{" | "}
        <Link to="/jobs">Jobs</Link>{" | "}
        <Link to="/candidates">Candidates</Link>{" | "}
        <Link to="/candidates/new">New Candidate</Link>{" | "}
        <Link to="/login">Login</Link>{" | "}
        <Link to="/register">Register</Link>
      </nav>

      <Navigation />

      <Routes>
        {/* Home and Dashboard */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/new" element={<AddJob />} />
        <Route path="/jobs/:jobId/edit" element={<EditJob />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        
        
        {/* Candidates */}
        <Route path="/candidates" element={<Candidates />} />
        <Route
          path="/candidates/new"
          element={<NewCandidate />}
        />
        <Route
          path="/candidates/:candidateId"
          element={<CandidateDetails />}
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Unknown URL */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
