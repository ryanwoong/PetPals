// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import HomeNavBar from './components/HomeNavBar';
import PickAPetPage from './pages/PickAPetPage'
import InstructionsPage from './pages/InstructionsPage'
import CheckInPage from './pages/CheckInPage.js';

function App() {
  return (
    <Router> {/* Only one Router here */}
      <HomeNavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/instructions" element={<InstructionsPage/>} />
        <Route path="/checkin" element={ <CheckInPage /> } />
        <Route path="/pickapet" element={ <PickAPetPage /> } />
      </Routes>
    </Router>
  );
}

export default App;