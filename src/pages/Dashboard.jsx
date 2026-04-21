import React, { Suspense } from 'react';
import HeroSection from '../components/dashboard/HeroSection';
import StatsGrid from '../components/dashboard/StatsGrid';
import NewsSection from '../components/dashboard/NewsSection';

// Lazy loading heavy components
const StockChart = React.lazy(() => import('../components/dashboard/StockChart'));
const PortfolioStats = React.lazy(() => import('../components/dashboard/PortfolioStats'));

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto pb-20 md:pb-8">
      <HeroSection />
      <StatsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="h-[400px] bg-white/50 dark:bg-slate-900/50 animate-pulse rounded-2xl" />}>
            <StockChart />
          </Suspense>
        </div>
        <div className="lg:col-span-1">
          <Suspense fallback={<div className="h-[400px] bg-white/50 dark:bg-slate-900/50 animate-pulse rounded-2xl" />}>
            <PortfolioStats />
          </Suspense>
        </div>
      </div>

      <NewsSection />
    </div>
  );
};

export default Dashboard;
