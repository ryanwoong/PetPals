import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Group, Container } from '@mantine/core';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Container>
        <Group position="center" mt="md">
          <Button component={Link} to="/login">
            Sign in
          </Button>
          <Button component={Link} to="/register">
            Register
          </Button>
        </Group>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Default route to redirect to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
