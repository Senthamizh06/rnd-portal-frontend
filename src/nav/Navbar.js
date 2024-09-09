import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Home</h1>
      </div>
      <div className="navbar-right">
        <div className="admin-menu">
          <button className="admin-button" onClick={toggleDropdown}>
            Admin
          </button>
          {dropdownOpen && (
            <div className="dropdown">
              <a href="#manage">Manage</a>
              <Link to="/departments" onClick={toggleDropdown}>Departments</Link>
              <Link to="/research-lab" onClick={toggleDropdown}>Research Lab</Link>
              <Link to="/user" onClick={toggleDropdown}>User</Link>
              
              <Link to="/role-master" onClick={toggleDropdown}>Role Master</Link>
              <a href="#settings">Settings</a>
              <a href="#logout">Logout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;