import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrawPage from './pages/DrawPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/draw" element={<DrawPage />} />
      </Routes>
    </Router>
  );
}

export default App;
