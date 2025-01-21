import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchNFTBrandMetricsData } from '../api/nftBrandMetricsApi';
import BrandMetricsDetailBox from '../components/BrandMetricsDetailBox';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const NFTBrandMetricsDetail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [expandedBrand, setExpandedBrand] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchNFTBrandMetricsData();
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
      <motion.div 
        className="flex items-center justify-center min-h-[calc(100vh-64px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-red-500 text-center p-8 bg-gray-800/50 rounded-lg shadow-xl backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <p className="text-xl font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] bg-gray-900 text-white p-4 md:p-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-[2000px] mx-auto">
        <motion.header 
          className="mb-8 text-center"
          variants={headerVariants}
        >
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">
            NFT Brand Metrics Detail
          </h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Track comprehensive performance metrics and insights for NFT brands
          </motion.p>
        </motion.header>

        {loading ? (
          <motion.div 
            className="flex items-center justify-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <motion.div 
                className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="mt-4 text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading brand metrics...
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              className="space-y-4"
              variants={pageVariants}
            >
              {metrics.map((brand, index) => (
                <motion.div
                  key={brand.contracts}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full transform hover:scale-[1.01] transition-transform duration-200"
                >
                  <BrandMetricsDetailBox
                    metrics={brand}
                    isExpanded={expandedBrand === brand.contracts}
                    onToggle={() => handleToggle(brand.contracts)}
                  />
                </motion.div>
              ))}
              {metrics.length === 0 && (
                <motion.div 
                  className="text-center py-8 bg-gray-800/50 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <p className="text-gray-400 text-lg">No brand metrics available</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default NFTBrandMetricsDetail;
