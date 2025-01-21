import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import NFTBrandMetadata from './pages/NFTBrandMetadata';
import NFTBrandMetrics from './pages/NFTBrandMetrics';
import NFTBrandProfile from './pages/NFTBrandProfile';
import NFTContractMetrics from './pages/NFTContractMetrics';
import NFTBrandMetricsDetail from './pages/NFTBrandMetricsDetail';
import NFTBrandContractProfile from './pages/NFTBrandContractProfile';
import NFTBrandCategory from './pages/NFTBrandCategory';
import { AnimatePresence } from 'framer-motion';

const Navigation = () => (
  <nav className="bg-gray-800 p-4">
    <div className="max-w-[1600px] mx-auto flex flex-wrap gap-4">
      <Link to="/" className="text-white hover:text-gray-300">Dashboard</Link>
      <Link to="/metadata" className="text-white hover:text-gray-300">Brand Metadata</Link>
      <Link to="/metrics" className="text-white hover:text-gray-300">Brand Metrics</Link>
      <Link to="/metrics-detail" className="text-white hover:text-gray-300">Brand Metrics Detail</Link>
      <Link to="/profile" className="text-white hover:text-gray-300">Brand Profile</Link>
      <Link to="/contract-metrics" className="text-white hover:text-gray-300">Contract Metrics</Link>
      <Link to="/contract-profile" className="text-white hover:text-gray-300">Contract Profile</Link>
      <Link to="/categories" className="text-white hover:text-gray-300">Brand Categories</Link>
    </div>
  </nav>
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/metadata" element={<NFTBrandMetadata />} />
          <Route path="/metrics" element={<NFTBrandMetrics />} />
          <Route path="/metrics-detail" element={<NFTBrandMetricsDetail />} />
          <Route path="/profile" element={<NFTBrandProfile />} />
          <Route path="/contract-metrics" element={<NFTContractMetrics />} />
          <Route path="/contract-profile" element={<NFTBrandContractProfile />} />
          <Route path="/categories" element={<NFTBrandCategory />} />
        </Routes>
      </AnimatePresence>
    </Router>
  </React.StrictMode>
);
