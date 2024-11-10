import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Text, Button, Container, TextInput, Group, Box } from '@mantine/core';

const CheckInPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const navigate = useNavigate(); // Create navigate function to handle navigation

  const moods = [
    { id: 1, emoji: '😠', label: 'Angry' },
    { id: 2, emoji: '😔', label: 'Sad' },
    { id: 3, emoji: '😐', label: 'Neutral' },
    { id: 4, emoji: '🙂', label: 'Happy' },
    { id: 5, emoji: '😁', label: 'Very Happy' }
  ];

  const handleNextClick = () => {
    navigate('/home'); // Navigate to CheckIn page
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'radial-gradient(circle, #ffeeaa, rgba(255, 255, 255, 0.1))',
        padding: '0 20px',
      }}
    >
      <Container
        style={{
          backgroundColor: '#f8d7a2',
          padding: '30px',
          borderRadius: '20px',
          width: '500px',
          textAlign: 'center',
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Text
          style={{
            fontFamily: "'Fuzzy Bubbles', sans-serif",
            color: '#333',
            fontSize: '1.4em',
            marginBottom: '15px',
          }}
        >
          What's on your mind today?
        </Text>

        <TextInput
          placeholder="Type here..."
          style={{
            width: '90%',  // Controls the width of the input
            padding: '12px',
            fontSize: '1em',
            borderRadius: '8px',
            margin: '0 auto',  // Horizontally centers the input
            display: 'block',  // Ensures block-level behavior to respect the margin
            marginBottom: '20px',  // Adds space below the input
          }}
        />

        <Text
          style={{
            fontFamily: "'Fuzzy Bubbles', sans-serif",
            color: '#333',
            fontSize: '1.4em',
            marginBottom: '15px',
            marginTop: '15px'
          }}
        >
          How are you feeling today?
        </Text>

        <Group
          position="center"
          spacing="lg"
          style={{
            marginTop: '20px',
          }}
        >
          {moods.map((mood) => (
            <Button
              key={mood.id}
              variant="transparent"
              style={{
                fontSize: '2.5em',
                padding: '0',  // Remove extra padding
                width: '70px',  // Set width
                height: '70px',  // Set height to make it circular
                borderRadius: '50%',  // Make button fully circular
                transition: 'transform 0.2s ease',
                transform: selectedMood === mood.id ? 'scale(1.3)' : 'scale(1)',
                outline: 'none',  // Remove outline
              }}
              onClick={() => setSelectedMood(mood.id)}
              title={mood.label}
              aria-label={mood.label}
            >
              {mood.emoji}
            </Button>
          ))}
        </Group>

        <Button
          variant="filled"
          color="#FFFAC3"
          style={{
            marginTop: '20px',
            fontFamily: "'Fuzzy Bubbles', sans-serif",
            fontSize: '1.2rem',
            padding: '10px 20px',
            color: 'black',
          }}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Container>
    </Box>
  );
};

export default CheckInPage;
