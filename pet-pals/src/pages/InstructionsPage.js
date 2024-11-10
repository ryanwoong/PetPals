import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Text, Box, List, Title, Button } from '@mantine/core';

const InstructionsPage = () => {
  const navigate = useNavigate();

  // Navigate to PickAPet page if user agrees
  const handleYes = () => {
    navigate('/pickapet');
  };

  // Show alert if user disagrees
  const handleNo = () => {
    alert("You need to comply with our rule to continue using PetPals! :(");
  };

  return (
    <Box
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'radial-gradient(circle, #ffeeaa, rgba(255, 255, 255, 0.1))' }}
    >
      <Container
        style={{ backgroundColor: '#f8d7a2', padding: '30px', borderRadius: '20px', width: '500px', textAlign: 'center', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)' }}
      >
        {/* Main title */}
        <Title
          order={1}
          style={{ fontSize: '3rem', color: '#333', fontFamily: "'Fuzzy Bubbles', sans-serif", textAlign: 'center' }}
        >
          Welcome to PetPals!
        </Title>

        {/* Subtitle for instructions */}
        <Title
          order={2}
          style={{ fontSize: '2rem', color: '#000000', fontFamily: "'Fuzzy Bubbles', sans-serif", marginBottom: '20px' }}
        >
          Instructions
        </Title>

        {/* Instructions list */}
        <List
          spacing="md"
          style={{ textAlign: 'left', fontFamily: "'Fuzzy Bubbles', sans-serif", fontSize: '1.2rem', marginBottom: '20px', paddingLeft: '20px', paddingRight: '30px' }}
        >
          <List.Item>PetPals aims to provide a safe space for those who want to express their thoughts!</List.Item>
          <List.Item>To gain currency, complete daily journal entries or leave positive comments on other people's posts.</List.Item>
          <List.Item>More currency = more pets and accessories!</List.Item>
          <List.Item>We want to remain a safe and welcoming environment for everyone, so please be mindful when writing comments!</List.Item>
        </List>

        {/* Agreement question */}
        <Text
          style={{ fontSize: '1.2rem', marginTop: '20px', fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#000000' }}
        >
          Do you agree?
        </Text>

        {/* Yes and No buttons */}
        <div style={{ marginTop: '20px' }}>
          <Button
            variant="filled"
            color="rgba(237, 152, 152, 1)"
            style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", marginRight: '10px', color: 'black' }}
            onClick={handleNo}
          >
            No
          </Button>
          <Button
            variant="filled"
            color="rgba(157, 201, 167, 1)"
            onClick={handleYes}
            style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: 'black' }}
          >
            Yes
          </Button>
        </div>
      </Container>
    </Box>
  );
};

export default InstructionsPage;
