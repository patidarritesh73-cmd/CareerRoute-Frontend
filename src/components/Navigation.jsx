
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="nav-link">
        Home
      </NavLink>

      <NavLink to="/dashboard" className="nav-link">
        Dashboard
      </NavLink>

      <NavLink to="/jobs" className="nav-link">
        Jobs
      </NavLink>

      <NavLink to="/candidates" className="nav-link">
        Candidates
      </NavLink>

      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>
    </nav>
  );
}

export default Navigation;
