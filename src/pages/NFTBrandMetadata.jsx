import { useState, useEffect, useMemo } from 'react';
import { fetchNFTBrandMetadata } from '../api/nftMetadata';
import CategoryBox from '../components/CategoryBox';
import BrandMetadataCard from '../components/BrandMetadataCard';
import { motion, AnimatePresence } from 'framer-motion';

const NFTBrandMetadata = () => {
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchNFTBrandMetadata();
        setMetadata(response.data);
        
        // Set the first available category as active
        if (response.data.length > 0) {
          const firstCategory = response.data[0].category?.toLowerCase() || 'uncategorized';
          setActiveCategory(firstCategory);
        }
      } catch (err) {
        setError('Failed to fetch NFT brand metadata');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Dynamically group brands by category and get unique categories
  const { groupedBrands, categories } = useMemo(() => {
    const grouped = metadata.reduce((acc, brand) => {
      const category = brand.category?.toLowerCase() || 'uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(brand);
      return acc;
    }, {});

    const uniqueCategories = Object.keys(grouped).map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      count: grouped[category].length
    }));

    return { groupedBrands: grouped, categories: uniqueCategories };
  }, [metadata]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
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
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            NFT Brand Metadata
          </h1>
          <p className="text-gray-400">Explore NFT brands by category</p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <div className="mt-4 text-gray-400">Loading brands...</div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CategoryBox
                    category={category.name}
                    count={category.count}
                    isActive={activeCategory === category.id}
                    onClick={() => handleCategoryClick(category.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Brand Cards */}
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                      {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} NFT Brands
                    </h2>
                    <span className="text-gray-400">
                      {groupedBrands[activeCategory]?.length || 0} brands
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {(groupedBrands[activeCategory] || []).map((brand, index) => (
                      <motion.div
                        key={brand.contract_address || index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <BrandMetadataCard brand={brand} />
                      </motion.div>
                    ))}
                    {(groupedBrands[activeCategory] || []).length === 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-400 col-span-2 text-center py-12 bg-gray-800/50 rounded-lg"
                      >
                        No brands found in this category.
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTBrandMetadata;
