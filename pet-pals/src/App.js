
// >>>>>>> origin/develop
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PickAPetPage from './pages/PickAPetPage'
import InstructionsPage from './pages/InstructionsPage'
import CheckInPage from './pages/CheckInPage';
import CommunityFeed from './pages/CommunityFeed';
import Journal from './pages/Journal';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={ <AuthPage /> } />
        <Route path="/home" element={<HomePage />} />
        <Route path="/community" element={<CommunityFeed />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/instructions" element={<InstructionsPage/>} />
        <Route path="/checkin" element={ <CheckInPage /> } />
        <Route path="/pickapet" element={ <PickAPetPage /> } />
      </Routes>
    </Router>
  );
}

export default App;