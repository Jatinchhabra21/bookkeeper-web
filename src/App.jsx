import React from 'react';
import './App.css';
import { Home, Dashboard, Record } from 'pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </Router>
  );
}

export default App;
