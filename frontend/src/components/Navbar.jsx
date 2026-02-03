import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">HRMS Lite</div>

      <div className="nav-links">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/employees">Employees</NavLink>
        <NavLink to="/attendance">Attendance</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
