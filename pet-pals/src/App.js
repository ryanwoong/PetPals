// import React from 'react';
// import HomePage from './pages/HomePage';
// import RegisterPage from './pages/RegisterPage';
// import AuthPage from './pages/AuthPage';

// import { Button } from '@mantine/core';
// import { Routes, Route } from 'react-router';

// function App() {
//   return (
//     // <div>
//     //   <HomePage />
//     //   <Button>test</Button>

//     // </div>
//     <>
//       <Routes>
//         <Route path="/" exact element={ <HomePage /> } />
//         <Route path="/AuthPage" exact element={ <AuthPage /> } />
//       </Routes>
    
//     </>
//   );
// }

// export default App;

// App.js
import AuthPage from './pages/AuthPage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
// import HomeNavBar from './components/HomeNavBar'; // Assuming this is your Navbar component

function App() {
  return (
    <Router> {/* Only one Router here */}
      {/* <HomeNavBar /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" exact element={ <AuthPage /> } />

      </Routes>
    </Router>
  );
}

export default App;