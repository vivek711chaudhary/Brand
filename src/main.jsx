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
  <nav className="bg-gray-800 p-4 sticky top-0 z-50 w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-white hover:text-gray-300 transition-colors">Dashboard</Link>
        <Link to="/metadata" className="text-white hover:text-gray-300 transition-colors">Brand Metadata</Link>
        <Link to="/metrics" className="text-white hover:text-gray-300 transition-colors">Brand Metrics</Link>
        <Link to="/metrics-detail" className="text-white hover:text-gray-300 transition-colors">Brand Metrics Detail</Link>
        <Link to="/profile" className="text-white hover:text-gray-300 transition-colors">Brand Profile</Link>
        <Link to="/contract-metrics" className="text-white hover:text-gray-300 transition-colors">Contract Metrics</Link>
        <Link to="/contract-profile" className="text-white hover:text-gray-300 transition-colors">Contract Profile</Link>
        <Link to="/categories" className="text-white hover:text-gray-300 transition-colors">Brand Categories</Link>
      </div>
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
