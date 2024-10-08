import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TestPage from './components/TestPage';
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/results/:testId" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
