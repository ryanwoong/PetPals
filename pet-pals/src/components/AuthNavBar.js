import React from 'react';
import { Group, Button, Text } from '@mantine/core';

const AuthNavBar = ({ method, toggleMethod }) => {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
      <Group position="apart" align="center">
        {/* Left side (Brand or logo) */}
        <Text weight={700} size="lg" color="blue" style={{ cursor: 'pointer' }}>
          PetPals
        </Text>

        {/* Right side (Toggle buttons for Sign In / Register) */}
        <Group position="right" spacing="sm">
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
      </Group>
    </nav>
  );
};

export default AuthNavBar;
