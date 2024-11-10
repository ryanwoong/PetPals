
// >>>>>>> origin/develop
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
// <<<<<<< login-new-new
// // import HomeNavBar from './components/HomeNavBar'; // Assuming this is your Navbar component

// function App() {
//   return (
//     <Router> {/* Only one Router here */}
//       {/* <HomeNavBar /> */}
//       <Routes>
//         {/* <Route path="/" element={<HomePage />} /> */}
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/" exact element={ <AuthPage /> } />

// =======
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/instructions" element={<InstructionsPage/>} />
        <Route path="/checkin" element={ <CheckInPage /> } />
        <Route path="/pickapet" element={ <PickAPetPage /> } />
// >>>>>>> origin/develop
      </Routes>
    </Router>
  );
}

export default App;