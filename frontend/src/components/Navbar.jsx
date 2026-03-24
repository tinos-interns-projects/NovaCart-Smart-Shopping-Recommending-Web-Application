import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ cart, searchTerm, setSearchTerm, user, setUser, staffUser, setStaffUser }) {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
  };

  const handleStaffLogout = () => {
    setStaffUser(null);
    localStorage.removeItem("staffUser");
    localStorage.removeItem("staffEmail");
  };

  // Check if we're on staff dashboard page
  const isStaffPage = window.location.pathname === "/staff-dashboard";

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Nova<span>cart</span></Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="nav-links">
        {staffUser ? (
          <div className="user-menu">
            <span className="user-name staff">Staff: {staffUser}</span>
            <Link to="/staff-dashboard" className="dashboard-link">Dashboard</Link>
            <button className="logout-btn" onClick={handleStaffLogout}>Staff Logout</button>
          </div>
        ) : (
          <>
            {user ? (
              <div className="user-menu">
                <span className="user-name">{user}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <>
                <Link to="/staff-login" className="staff-login-link">Staff Login</Link>
                <Link to="/login" className="login-btn">User Login</Link>
              </>
            )}
          </>
        )}
        {!isStaffPage && !staffUser && (
          <>
            <Link to="/recommendations" className="rec-link">
              Recommendations
            </Link>
            <Link to="/cart" className="cart-link">
              Cart ({cart.length})
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
