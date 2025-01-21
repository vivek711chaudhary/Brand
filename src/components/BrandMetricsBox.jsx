import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const BrandMetricsBox = ({ brand, isExpanded, onToggle }) => {
  // Format number to USD
  const formatUSD = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Format large numbers
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <motion.div
      layout
      className="w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-primary/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header - Always visible */}
      <div
        onClick={onToggle}
        className="p-6 cursor-pointer hover:bg-gray-700/30 transition-colors"
      >
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-white">{brand.brand}</h3>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                {brand.blockchain}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Growth Rate:</span>
                <span className={`font-semibold ${brand.growth_rate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {brand.growth_rate.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Revenue:</span>
                <span className="text-white font-semibold">{formatUSD(brand.total_revenue)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Holders:</span>
                <span className="text-white font-semibold">{formatNumber(brand.holders)}</span>
              </div>
            </div>
          </div>
          <motion.div
            initial={false}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDownIcon className="w-6 h-6 text-gray-400" />
            )}
          </motion.div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 border-t border-gray-700 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Market Metrics */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-primary">Market Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Cap</span>
                      <span className="text-white font-medium">{formatUSD(brand.mcap)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Volume</span>
                      <span className="text-white font-medium">{formatUSD(brand.total_volume)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Traders</span>
                      <span className="text-white font-medium">{formatNumber(brand.traders)}</span>
                    </div>
                  </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-primary">Revenue Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mint Revenue</span>
                      <span className="text-white font-medium">{formatUSD(brand.mint_revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Primary Sales</span>
                      <span className="text-white font-medium">{formatUSD(brand.primary_sale_revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Secondary Sales</span>
                      <span className="text-white font-medium">{formatUSD(brand.secondary_sale_revenue)}</span>
                    </div>
                  </div>
                </div>

                {/* Collection Info */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-primary">Collection Info</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Assets</span>
                      <span className="text-white font-medium">{formatNumber(brand.assets_all)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Interactions</span>
                      <span className="text-white font-medium">{formatNumber(brand.interactions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contracts</span>
                      <span className="text-white font-medium">{formatNumber(brand.No_of_contracts)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contract Address */}
              <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Contract Address:</span>
                  <span className="text-white font-mono text-sm truncate ml-4">{brand.contracts}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BrandMetricsBox;
