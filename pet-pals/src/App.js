import React from 'react';
import PickAPetPage from './pages/PickAPetPage.js'
import InstructionsPage from './pages/InstructionsPage.js'
import CheckInPage from './pages/CheckInPage.js';

import { Routes, Route } from 'react-router';

function App() {
  return (
    // <div>
    //   <HomePage />
    //   <Button>test</Button>

    // </div>
    <>
      <Routes>
        <Route path="/" exact element={<InstructionsPage/>} />
        <Route path="/CheckInPage" exact element={ <CheckInPage /> } />
        <Route path="/PickAPet" exact element={ <PickAPetPage /> } />
      </Routes>
    
    </>
  );
}

export default App;