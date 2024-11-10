import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Text, Button, Container, TextInput, Group, Box } from '@mantine/core';

const CheckInPage = () => {
  // State to track the selected mood
  const [selectedMood, setSelectedMood] = useState(null);

  const navigate = useNavigate(); // Function to navigate between routes

  // Array of mood options, each with an emoji and label
  const moods = [
    { id: 1, emoji: '😠', label: 'Angry' },
    { id: 2, emoji: '😔', label: 'Sad' },
    { id: 3, emoji: '😐', label: 'Neutral' },
    { id: 4, emoji: '🙂', label: 'Happy' },
    { id: 5, emoji: '😁', label: 'Very Happy' }
  ];

  // Function to navigate to the home page when "Next" is clicked
  const handleNextClick = () => {
    navigate('/home');
  };

  return (
    // Full-page background container with centered content
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
          backgroundColor: '#f8d7a2', // Background color for the inner container
          padding: '30px',
          borderRadius: '20px',
          width: '500px',
          textAlign: 'center',
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)', // Adds a soft shadow
        }}
      >
        {/* Heading text prompting the user for input */}
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

        {/* Text input for the user to type their thoughts */}
        <TextInput
          placeholder="Type here..."
          style={{
            width: '90%', // Sets the width of the input
            padding: '12px',
            fontSize: '1em',
            borderRadius: '8px',
            margin: '0 auto', // Centers the input horizontally
            display: 'block',
            marginBottom: '20px', // Space below the input
          }}
        />

        {/* Subheading text prompting the user to select a mood */}
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

        {/* Group of mood selection buttons */}
        <Group
          position="center"
          spacing="lg"
          style={{
            marginTop: '20px',
          }}
        >
          {/* Map through moods array to render each mood as a button */}
          {moods.map((mood) => (
            <Button
              key={mood.id}
              variant="transparent" // Transparent style for button
              style={{
                fontSize: '2.5em',
                padding: '0', // Removes padding for a cleaner look
                width: '70px', // Sets width of the button
                height: '70px', // Sets height to make it circular
                borderRadius: '50%', // Fully circular button
                transition: 'transform 0.2s ease', // Smooth scaling effect on click
                transform: selectedMood === mood.id ? 'scale(1.3)' : 'scale(1)', // Scale if selected
                outline: 'none', // Removes outline
              }}
              onClick={() => setSelectedMood(mood.id)} // Set the selected mood when clicked
              title={mood.label} // Tooltip text for accessibility
              aria-label={mood.label} // Accessibility label
            >
              {mood.emoji} {/* Display mood emoji */}
            </Button>
          ))}
        </Group>

        {/* "Next" button to proceed to the next page */}
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
          onClick={handleNextClick} // Navigate to home page on click
        >
          Next
        </Button>
      </Container>
    </Box>
  );
};

export default CheckInPage;
