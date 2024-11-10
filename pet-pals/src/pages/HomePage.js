import React from 'react';
import { Button } from "@mantine/core";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>My Simple React Home Page</h1>
      </header>
      <main>
        <p>Welcome to my simple React home page! This is a basic example of a React project.</p>
        <img src="https://via.placeholder.com/300" alt="Placeholder" />
        <Button><Link to="/register">Register</Link></Button>
      </main>
    </div>
  );
}

export default HomePage;