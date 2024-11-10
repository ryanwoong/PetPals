import React from 'react';
import { Group, Button, Center, Image, Container } from '@mantine/core';
import LogoImage from '../assets/logo.png';

const AuthNavBar = ({ method, toggleMethod }) => {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
      <Container>
        <Center>
          <Image src={LogoImage} alt="Logo" h={80} w={80} />
        </Center>
        <Center>
          <Group spacing="sm" position="center" mt="md">
            <Button
              style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                fontFamily: "'Fuzzy Bubbles'",
                // color: '#000000',
              }}
              variant={method === 'signIn' ? 'filled' : 'subtle'}
              color="#FFCF9F"
              onClick={() => method === 'signUp' && toggleMethod()}
            >
              Sign In
            </Button>
            <Button
              style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                // color: '#000000',
              }}
              variant={method === 'signUp' ? 'filled' : 'subtle'}
              color="#FFCF9F"
              onClick={() => method === 'signIn' && toggleMethod()}
            >
              Register
            </Button>
          </Group>
        </Center>
      </Container>
    </nav>
  );
};

export default AuthNavBar;