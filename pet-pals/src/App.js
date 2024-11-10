import React from 'react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { Button } from '@mantine/core';
import { Routes, Route } from 'react-router';

function App() {
  return (
    // <div>
    //   <HomePage />
    //   <Button>test</Button>

    // </div>
    <>
      <Routes>
        <Route path="/" exact element={ <HomePage /> } />
        <Route path="/register" exact element={ <RegisterPage /> } />
      </Routes>
    
    </>
  );
}

export default App;
