import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/Logo.png';

const HomeNavBar = () => {
  const styles = {
    navbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '5px 40px',
      backgroundColor: '#FFCF9F',
      fontSize: '16px',
      position: 'fixed',
      width: '100%',
      zIndex: 100,
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      backgroundColor: 'white',  // White background for the circular container
      marginRight: '20px',       // Space between logo and links
    },
    logoImage: {
      width: '70px',             // Scale the image to fit within the circle
      height: 'auto',
    },
    link: {
      margin: '0 15px',
      color: 'black',
      textDecoration: 'none',
      fontSize: '16px',
    },
    active: {
      color: '#FFFAC3',
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo in White Circle */}
      <Link to="/home" style={styles.logoContainer}>
        <img src={LogoImage} alt="Logo" style={styles.logoImage} />
      </Link>

      {/* Navigation Links */}
      <Link to="/home" style={styles.link}>Home</Link>
      <Link to="/community" style={styles.link}>Community</Link>
      <Link to="/journal" style={styles.link}>Journal</Link>
    </nav>
  );
};

export default HomeNavBar;
