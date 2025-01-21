import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const BrandMetricsDetailBox = ({ metrics, isExpanded, onToggle }) => {
  // Format currency
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

  // Parse marketplace volume
  const parseMarketplaceVolume = (volumeArray) => {
    if (!volumeArray || volumeArray.length === 0) return {};
    const volumes = {};
    volumeArray.forEach(volume => {
      const [marketplace, value] = volume.replace(/'/g, '').split(':');
      volumes[marketplace] = parseFloat(value);
    });
    return volumes;
  };

  const marketplaceVolumes = parseMarketplaceVolume(metrics.marketplace_volume);

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
        className="p-4 cursor-pointer hover:bg-gray-700/30 transition-colors bg-gray-800/20 rounded-lg"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-grow">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-white">{metrics.brand}</h3>
              <span className="px-3 py-0.5 bg-primary/20 text-primary rounded-full text-sm">
                {metrics.blockchain}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <span className="text-gray-400 text-sm block">Growth Rate</span>
                <div className={`text-lg font-semibold ${metrics.growth_rate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {metrics.growth_rate.toFixed(2)}%
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <span className="text-gray-400 text-sm block">Holders</span>
                <div className="text-lg font-semibold text-white">
                  {formatNumber(metrics.holders)}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <span className="text-gray-400 text-sm block">Retained Traders</span>
                <div className="text-lg font-semibold text-white">
                  {formatNumber(metrics.retained_traders)}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <span className="text-gray-400 text-sm block">Total Revenue</span>
                <div className="text-lg font-semibold text-white">
                  {formatUSD(metrics.total_revenue)}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <span className="text-gray-400 text-sm block">Market Cap</span>
                <div className="text-lg font-semibold text-white">
                  {formatUSD(metrics.mcap)}
                </div>
              </div>
            </div>
          </div>
          <motion.div
            initial={false}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
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
            <div className="px-4 pb-4 border-t border-gray-700 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Revenue Metrics */}
                <div className="bg-gray-800/30 rounded-lg p-4 space-y-2">
                  <h4 className="text-base font-semibold text-primary">Revenue Breakdown</h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Mint Revenue</span>
                      <span className="text-white text-sm">{formatUSD(metrics.mint_revenue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Primary Sales</span>
                      <span className="text-white text-sm">{formatUSD(metrics.primary_sale_revenue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Secondary Sales</span>
                      <span className="text-white text-sm">{formatUSD(metrics.secondary_sale_revenue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Royalty Revenue</span>
                      <span className="text-white text-sm">{formatUSD(metrics.royalty_revenue)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5 border-t border-gray-700">
                      <span className="text-gray-400 text-sm">Total Volume</span>
                      <span className="text-white text-sm">{formatUSD(metrics.total_volume)}</span>
                    </div>
                  </div>
                </div>

                {/* Trading Activity */}
                <div className="bg-gray-800/30 rounded-lg p-4 space-y-2">
                  <h4 className="text-base font-semibold text-primary">Trading Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Total Traders</span>
                      <span className="text-white text-sm">{formatNumber(metrics.traders)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">User Interactions</span>
                      <span className="text-white text-sm">{formatNumber(metrics.interactions)}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Retention Rate</span>
                        <span className="text-white text-sm">
                          {metrics.traders > 0 ? 
                            ((metrics.retained_traders / metrics.traders * 100).toFixed(1) + '%') : 
                            '0%'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${metrics.traders > 0 ? 
                              (metrics.retained_traders / metrics.traders * 100) : 0}%` 
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand Details */}
                <div className="bg-gray-800/30 rounded-lg p-4 space-y-2">
                  <h4 className="text-base font-semibold text-primary">Brand Details</h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Collection</span>
                      <span className="text-white text-sm">{metrics.collection}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Total Assets</span>
                      <span className="text-white text-sm">{formatNumber(metrics.assets_all)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Number of Contracts</span>
                      <span className="text-white text-sm">{formatNumber(metrics.No_of_contracts)}</span>
                    </div>
                    {Object.entries(marketplaceVolumes).map(([marketplace, volume]) => (
                      <div key={marketplace} className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm capitalize">{marketplace} Volume</span>
                        <span className="text-white text-sm">{formatUSD(volume)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contract Details */}
              <div className="mt-4 bg-gray-800/50 rounded-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-400 text-sm block mb-1">Contract Address</span>
                    <span className="text-white font-mono text-sm break-all bg-gray-900/50 p-2 rounded-lg block">
                      {metrics.contracts}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block mb-1">Chain ID</span>
                    <span className="text-white font-mono text-sm bg-gray-900/50 p-2 rounded-lg block">
                      {metrics.chain_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BrandMetricsDetailBox;
