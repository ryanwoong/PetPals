import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">PetPals</div>
      {/* <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Top-up</li>
        <li>Help</li>
        <li>Blog</li>
      </ul> */}
      <div className="auth-buttons">
        <button className="sign-in"><Link to="/Login">
        Sign in</Link></button>

        <button className="register"><Link to="/Register"> Register
        </Link></button>
      </div>
    </nav>
  );
};

export default Navbar;
