import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import ScannerPage from './pages/ScannerPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-cyan-500/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/scan" element={<ScannerPage />} />
        </Routes>
        
        <footer className="border-t border-slate-800 py-12 text-center text-slate-500 text-sm mt-auto">
          <p>&copy; {new Date().getFullYear()} Genesis Guard AI Scanner Blueprint</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
