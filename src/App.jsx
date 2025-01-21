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

function App() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [metadata, setMetadata] = useState([]);
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

  // Calculate total market cap and volume
  const totalMarketCap = metrics.reduce((sum, brand) => sum + brand.mcap, 0);
  const totalVolume = metrics.reduce((sum, brand) => sum + brand.total_volume, 0);
  const averageGrowthRate = metrics.reduce((sum, brand) => sum + brand.growth_rate, 0) / metrics.length;

  // Prepare chart data
  const chartData = {
    labels: metrics.map(brand => brand.brand),
    datasets: [
      {
        label: 'Market Cap',
        data: metrics.map(brand => brand.mcap),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Trading Volume',
        data: metrics.map(brand => brand.total_volume),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }
    ]
  };

  const growthChartData = {
    labels: metrics.map(brand => brand.brand),
    datasets: [
      {
        label: 'Growth Rate',
        data: metrics.map(brand => brand.growth_rate),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* <Navbar /> */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <div className="container mx-auto px-4 py-8">
              <header className="mb-8">
                <h1 className="text-3xl font-bold">NFT Brand Dashboard</h1>
                {loading && <p className="text-gray-400">Loading data...</p>}
              </header>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Market Cap"
                  value={`$${(totalMarketCap / 1000000).toFixed(2)}M`}
                  icon={CurrencyDollarIcon}
                />
                <StatCard
                  title="Total Volume"
                  value={`$${(totalVolume / 1000).toFixed(2)}K`}
                  icon={ChartBarIcon}
                />
                <StatCard
                  title="Avg Growth Rate"
                  value={`${averageGrowthRate.toFixed(2)}%`}
                  icon={ArrowTrendingUpIcon}
                />
                <StatCard
                  title="Active Brands"
                  value={metrics.length}
                  icon={UsersIcon}
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="card">
                  <Chart data={chartData} title="Market Cap & Volume" />
                </div>
                <div className="card">
                  <Chart data={growthChartData} title="Growth Rate by Brand" />
                </div>
              </div>

              {/* Brands Table */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Top NFT Brands</h2>
                <BrandTable brands={metrics.map(brand => ({
                  name: brand.brand,
                  marketCap: brand.mcap,
                  growth: brand.growth_rate,
                  volume: brand.total_volume,
                  holders: brand.holders,
                  verified: true // You can add verification logic based on metadata
                }))} />
              </div>
            </div>
          } />
          <Route path="/category" element={<NFTBrandCategory />} />
          <Route path="/contracts" element={<NFTBrandContractProfile />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
