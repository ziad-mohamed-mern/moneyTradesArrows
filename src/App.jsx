import React, { Suspense, useEffect, lazy } from 'react';
import { useStore } from './store/useStore';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Auth from './pages/Auth';

// ── Lazy-loaded pages for code splitting ──────────────────────────────────────
const Dashboard    = lazy(() => import('./pages/Dashboard'));
const TradingPage  = lazy(() => import('./pages/TradingPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const NewsPage     = lazy(() => import('./pages/NewsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

// ── Page Loader ───────────────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      <p className="text-sm text-slate-400">جاري التحميل...</p>
    </div>
  </div>
);

// ── Page Router ───────────────────────────────────────────────────────────────
const PageRouter = ({ page }) => {
  switch (page) {
    case 'trading':   return <TradingPage />;
    case 'portfolio': return <PortfolioPage />;
    case 'news':      return <NewsPage />;
    case 'settings':  return <SettingsPage />;
    default:          return <Dashboard />;
  }
};

// ─────────────────────────────────────────────────────────────────────────────

function App() {
  const { darkMode, isAuthenticated, activePage } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  }, [darkMode]);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-mesh">
          <Suspense fallback={<PageLoader />}>
            <PageRouter page={activePage} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
