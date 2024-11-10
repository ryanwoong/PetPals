// Navbar component for the home page
import React from 'react';
import './HomePage.css';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><a href="#home" className="navItem">Home</a></li>
        <li><a href="#about" className="navItem">About</a></li>
        <li><a href="#services" className="navItem">Services</a></li>
        <li><a href="#contact" className="navItem">Contact</a></li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#FFCF9F',
    padding: '1rem',
    margin: 0
  },
  
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0
  },
};

export default Navbar;
