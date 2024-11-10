import React from 'react';
import Navbar from './HomeNavBar';
import './HomePage.css';
import catImage from '../../Pictures/Cat.gif';
import textImage from '../../Pictures/PetText.png';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <img src={textImage} alt="Text Box" className="textImage" />
        <img src={catImage} alt="Pixel Art Cat" className="catImage" />
      </main>
    </div>
  );
}

export default HomePage;