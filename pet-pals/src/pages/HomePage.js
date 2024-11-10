import { Transition } from '@mantine/core';
import React, { useState } from 'react';
import catGif from '../assets/Cat.gif';
import textImage from '../assets/PetText.png';
import HomeNavBar from '../components/HomeNavBar';

const HomePage = () => {
  const [showHeart, setShowHeart] = useState(false);
  const [showTextbox, setShowTextbox] = useState(false);

  const handleCatClick = () => {
    setShowHeart(true);
    setShowTextbox(true);

    // Set a timeout to hide heart and textbox after 5 seconds
    setTimeout(() => {
      setShowHeart(false);
      setShowTextbox(false);
    }, 5000);
  };

  return (
    <>
      <HomeNavBar />
      <div style={{ position: 'relative', height: '100vh', backgroundColor: '#FDF5E6', overflow: 'hidden' }}>

        {/* Cat gif */}
        <img
          src={catGif}
          alt="Cat"
          style={{ position: 'absolute', bottom: '20px', left: '250px', cursor: 'pointer', width: '200px', height: 'auto' }}
          onClick={handleCatClick}
        />

        {/* Heart */}
        {showHeart && (
          <div style={{ position: 'absolute', bottom: '100px', left: '240px', fontSize: '24px' }}>
            ❤️
          </div>
        )}

        {/* Display Text Image */}
        <Transition mounted={showTextbox} transition="fade" duration={500} timingFunction="ease">
          {(styles) => (
            <img
              src={textImage}
              alt="Text"
              style={{
                ...styles,
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: 'auto',
              }}
            />
          )}
        </Transition>
      </div>
    </>
  );
};

export default HomePage;
