import React from 'react';
import { Group, Button, Center, Image, Container } from '@mantine/core';
import LogoImage from '../assets/Images/logo_gif.gif';

const AuthNavBar = ({ method, toggleMethod }) => {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
      <Container>
        <Center>
          <Image src={LogoImage} alt="Logo" h={200} w={200} />
        </Center>
        <Center>
          <Group spacing="sm" position="center" mt="md">
            <Button
              style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                fontFamily: "'Fuzzy Bubbles'",
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
                fontFamily: 'Fuzzy Bubbles'
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