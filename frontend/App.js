import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TestPage from './components/TestPage';
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test/:testId" element={<TestPage />} />
          <Route path="/results/:testId" element={<ResultsPage />} />
          <Route
            path="*"
            element={<div style={{ textAlign: 'center' }}>Page not found.</div>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
