import { Box, Button, Container, Text, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import catGif from '../assets/Images/cat.gif';
import monkeyGif from '../assets/Images/monkey.gif';
import snakeGif from '../assets/Images/snake.gif';

const PickAPetPage = () => {
  const [petNames, setPetNames] = useState({
    monkey: 'Momo the Monkey',
    cat: 'Fluffy the Cat',
    snake: 'Bubbles the Snake',
  });
  
  const [selectedPet, setSelectedPet] = useState(null); // State to track the selected pet
  const [tempName, setTempName] = useState(''); // Temporary name for renaming pet
  const navigate = useNavigate(); // Hook to navigate between routes

  // Function to select a pet and set its temporary name
  const handleSelectPet = (petKey) => {
    setSelectedPet(petKey);
    setTempName(petNames[petKey]);
  };

  // Function to handle renaming input
  const handleTempNameChange = (event) => {
    setTempName(event.target.value);
  };

  // Function to handle 'Next' button click to save pet name and navigate to the next page
  const handleNext = () => {
    if (selectedPet) {
      setPetNames((prevNames) => ({ ...prevNames, [selectedPet]: tempName }));
      setSelectedPet(null);
      setTempName('');
      navigate('/checkin');  // Navigate to CheckIn page
    }
  };

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'radial-gradient(circle, #ffeeaa, rgba(255, 255, 255, 0.1))' }}>
      <Container style={{ backgroundColor: '#f8d7a2', padding: '30px', borderRadius: '20px', width: '600px', textAlign: 'center', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)' }}>
        <Title order={1} style={{ fontSize: '3rem', color: '#333', fontFamily: "'Fuzzy Bubbles', sans-serif", textAlign: 'center' }}>
          Pick A Pet
        </Title>

        <Text style={{ fontSize: '1.5rem', marginBottom: '20px', fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#000000' }}>
          Choose your first pet companion from the options below!
        </Text>

        {/* Pet Options */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {/* Monkey Pet Option */}
          <div style={{ textAlign: 'center' }}>
            <Button
              variant="filled"
              color="#FFFAC3"
              style={{ width: '150px', height: '150px', padding: 0, marginBottom: '10px', backgroundColor: selectedPet === 'monkey' ? 'rgba(232, 228, 188, 1)' : '#FFFAC3' }}
              onClick={() => handleSelectPet('monkey')}
            >
              <img src={monkeyGif} alt={petNames.monkey} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} />
            </Button>
            <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333' }}>
              {petNames.monkey}
            </Text>
          </div>

          {/* Cat Pet Option */}
          <div style={{ textAlign: 'center' }}>
            <Button
              variant="filled"
              color="#FFFAC3"
              style={{ width: '150px', height: '150px', padding: 0, marginBottom: '10px', backgroundColor: selectedPet === 'cat' ? 'rgba(232, 228, 188, 1)' : '#FFFAC3' }}
              onClick={() => handleSelectPet('cat')}
            >
              <img src={catGif} alt={petNames.cat} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
            </Button>
            <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333' }}>
              {petNames.cat}
            </Text>
          </div>

          {/* Snake Pet Option */}
          <div style={{ textAlign: 'center' }}>
            <Button
              variant="filled"
              color="#FFFAC3"
              style={{ width: '150px', height: '150px', padding: 0, marginBottom: '10px', backgroundColor: selectedPet === 'snake' ? 'rgba(232, 228, 188, 1)' : '#FFFAC3' }}
              onClick={() => handleSelectPet('snake')}
            >
              <img src={snakeGif} alt={petNames.snake} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
            </Button>
            <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333' }}>
              {petNames.snake}
            </Text>
          </div>
        </div>

        {/* Rename Input and Next Button */}
        {selectedPet && (
          <>
            <Text style={{ marginTop: '20px', fontFamily: "'Fuzzy Bubbles', sans-serif", fontSize: '1.2rem', color: '#333' }}>
              Rename your pet!
            </Text>
            <TextInput
              placeholder="Rename your pet"
              value={tempName}
              onChange={handleTempNameChange}
              style={{ marginTop: '10px', fontFamily: "'Fuzzy Bubbles', sans-serif", fontSize: '1.2rem' }}
            />
            <Button
              variant="filled"
              color="#FFFAC3"
              onClick={handleNext}
              style={{ marginTop: '10px', fontFamily: "'Fuzzy Bubbles', sans-serif", fontSize: '1rem', color: 'black' }}
            >
              Next
            </Button>
          </>
        )}
      </Container>
    </Box>
  );
};

export default PickAPetPage;
