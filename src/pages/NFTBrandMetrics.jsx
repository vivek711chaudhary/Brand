import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchNFTBrandMetrics } from '../api/nftBrandMetrics';
import BrandMetricsBox from '../components/BrandMetricsBox';

const NFTBrandMetrics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [expandedBrand, setExpandedBrand] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchNFTBrandMetrics();
        setMetrics(response.data);
      } catch (err) {
        setError('Failed to fetch NFT brand metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (brandId) => {
    setExpandedBrand(expandedBrand === brandId ? null : brandId);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-red-500 text-center p-8 bg-gray-800 rounded-lg shadow-xl">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xl font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto"> 
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            NFT Brand Metrics
          </h1>
          <p className="text-gray-400">Track performance metrics for NFT brands</p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <div className="mt-4 text-gray-400">Loading metrics...</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {metrics.map((brand, index) => (
              <motion.div
                key={brand.contracts}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BrandMetricsBox
                  brand={brand}
                  isExpanded={expandedBrand === brand.contracts}
                  onToggle={() => handleToggle(brand.contracts)}
                />
              </motion.div>
            ))}
            {metrics.length === 0 && (
              <div className="text-center py-12 bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">No brand metrics available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTBrandMetrics;
