import { Transition, Container, Text } from '@mantine/core';
import React, { useState } from 'react';
import catGif from '../assets/Images/cat.gif';
import textImage from '../assets/Images/pet_text.png';
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
      <Container fluid style={{ position: 'relative', height: '100vh', backgroundColor: '#FDF5E6', overflow: 'hidden' }}>
        
        {/* Cat gif */}
        <img
          src={catGif}
          alt="Cat"
          style={{ position: 'absolute', bottom: '20px', left: '140px', cursor: 'pointer', width: '200px', height: 'auto' }}
          onClick={handleCatClick}
        />

        {/* Heart */}
        {showHeart && (
          <Text style={{ position: 'absolute', bottom: '150px', left: '130px', fontSize: '24px' }}>
            ❤️
          </Text>
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
                left: '35%',
                transform: 'translate(-50%, -50%)',
                width: '450px',
                height: 'auto',
              }}
            />
          )}
        </Transition>

        {/* White Box for Shop and Inventory */}
        <Container
          style={{
            position: 'absolute',
            top: '20%',
            right: '20px',
            width: '500px',
            height: '500px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          {/* <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", fontSize: '1.5rem', color: '#000000', marginBottom: '10px' }}>
            Shop & Inventory
          </Text> */}
          <Container>

          </Container>
        </Container>
      </Container>
    </>
  );
};

export default HomePage;
