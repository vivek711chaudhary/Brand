import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import StatCard from './components/StatCard';
import Chart from './components/Chart';
import BrandTable from './components/BrandTable';
import { getBrandMetrics, getBrandProfile, getBrandContractMetadata } from './services/api';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import NFTBrandMetricsDetail from './pages/NFTBrandMetricsDetail';
import NFTBrandCategory from './pages/NFTBrandCategory';
import NFTBrandContractProfile from './pages/NFTBrandContractProfile';
import { DashboardAIBox } from './components/AIAnalysis';

function App() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metricsRes, profilesRes, metadataRes] = await Promise.all([
          getBrandMetrics(),
          getBrandProfile(),
          getBrandContractMetadata()
        ]);

        setMetrics(metricsRes.data);
        setProfiles(profilesRes.data);
        setMetadata(metadataRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (metrics.length > 0) {
      // Get top 5 brands by market cap
      const topBrands = [...metrics]
        .sort((a, b) => b.mcap - a.mcap)
        .slice(0, 5);

      // Create chart data from brand metrics
      const chartData = {
        labels: topBrands.map(brand => brand.brand),
        datasets: [
          {
            label: 'Market Cap',
            data: topBrands.map(brand => brand.mcap),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            yAxisID: 'marketCap',
          },
          {
            label: 'Trading Volume',
            data: topBrands.map(brand => brand.total_volume),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'volume',
          },
          {
            label: 'Growth Rate',
            data: topBrands.map(brand => brand.growth_rate),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'growth',
          }
        ],
      };

      setChartData(chartData);

      // Update dashboard data with real metrics
      setDashboardData({
        total_volume: metrics.reduce((sum, brand) => sum + brand.total_volume, 0),
        total_market_cap: metrics.reduce((sum, brand) => sum + brand.mcap, 0),
        active_traders: metrics.reduce((sum, brand) => sum + brand.holders, 0),
        total_transactions: metrics.reduce((sum, brand) => sum + brand.transactions, 0),
        top_brands: topBrands.map(brand => ({
          name: brand.brand,
          volume: brand.total_volume,
          market_cap: brand.mcap,
          growth: brand.growth_rate
        })),
        avg_growth_rate: metrics.reduce((sum, brand) => sum + brand.growth_rate, 0) / metrics.length,
      });
    }
  }, [metrics]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            NFT Brand Analytics
          </h1>
          <p className="text-gray-400 text-lg">Real-time insights for top NFT brands</p>
        </header>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10">
            <h3 className="text-gray-400 text-sm font-medium mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Total Market Cap
            </h3>
            <p className="text-2xl font-bold text-white">
              ${(dashboardData?.total_market_cap / 1e6).toFixed(2)}M
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
            <h3 className="text-gray-400 text-sm font-medium mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Trading Volume
            </h3>
            <p className="text-2xl font-bold text-white">
              ${(dashboardData?.total_volume / 1e3).toFixed(2)}K
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/10">
            <h3 className="text-gray-400 text-sm font-medium mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Active Traders
            </h3>
            <p className="text-2xl font-bold text-white">
              {dashboardData?.active_traders?.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 shadow-lg hover:shadow-teal-500/10">
            <h3 className="text-gray-400 text-sm font-medium mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Avg Growth Rate
            </h3>
            <p className="text-2xl font-bold text-white">
              {dashboardData?.avg_growth_rate?.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Top 5 Brands Performance
              </h2>
              {chartData && <Chart data={chartData} />}
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg h-full">
              {dashboardData && <DashboardAIBox data={dashboardData} />}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Top Performing Brands */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <h3 className="text-gray-300 text-sm font-medium mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Top Performing Brands
            </h3>
            <div className="space-y-4">
              {dashboardData?.top_brands?.slice(0, 3).map((brand, index) => (
                <div 
                  key={brand.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                      index === 1 ? 'bg-gray-400/20 text-gray-400' :
                      'bg-amber-600/20 text-amber-600'
                    }`}>
                      #{index + 1}
                    </div>
                    <span className="text-sm font-medium text-white">{brand.name}</span>
                  </div>
                  <span className="text-sm font-medium text-blue-400">
                    ${(brand.market_cap / 1e6).toFixed(2)}M
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Volume Leaders */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <h3 className="text-gray-300 text-sm font-medium mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Volume Leaders
            </h3>
            <div className="space-y-4">
              {dashboardData?.top_brands?.sort((a, b) => b.volume - a.volume).slice(0, 3).map((brand, index) => (
                <div 
                  key={brand.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                      index === 1 ? 'bg-gray-400/20 text-gray-400' :
                      'bg-amber-600/20 text-amber-600'
                    }`}>
                      #{index + 1}
                    </div>
                    <span className="text-sm font-medium text-white">{brand.name}</span>
                  </div>
                  <span className="text-sm font-medium text-purple-400">
                    ${(brand.volume / 1e3).toFixed(2)}K
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Leaders */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <h3 className="text-gray-300 text-sm font-medium mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Growth Leaders
            </h3>
            <div className="space-y-4">
              {dashboardData?.top_brands?.sort((a, b) => b.growth - a.growth).slice(0, 3).map((brand, index) => (
                <div 
                  key={brand.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 border border-gray-600/30 hover:border-green-500/30 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                      index === 1 ? 'bg-gray-400/20 text-gray-400' :
                      'bg-amber-600/20 text-amber-600'
                    }`}>
                      #{index + 1}
                    </div>
                    <span className="text-sm font-medium text-white">{brand.name}</span>
                  </div>
                  <span className="text-sm font-medium text-green-400">
                    {brand.growth?.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
