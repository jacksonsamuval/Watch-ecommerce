import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
 
  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">
            <h1>JacKson</h1>
          </div>
        </div>

        <ul className={`nav-links ${isMobile ? "active" : ""}`}>
          <li>
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/productList" className="nav-link">
              All Products
            </Link>
          </li>
          <li>
            <Link to="/addProductForm" className="nav-link">
              Add Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/aboutUs" className="nav-link">
              About
            </Link>
          </li>
        </ul>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
