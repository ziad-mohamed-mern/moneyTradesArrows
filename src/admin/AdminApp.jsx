import React, { Suspense } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { Toaster } from 'react-hot-toast';

import AdminLogin from './pages/AdminLogin';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';

import AdminDashboard from './pages/AdminDashboard';
import ProjectsPage from './pages/ProjectsPage';
import AdminNewsPage from './pages/AdminNewsPage';

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
);

const AdminRouter = ({ page }) => {
  switch (page) {
    case 'dashboard': return <AdminDashboard />;
    case 'projects':  return <ProjectsPage />;
    case 'news':      return <AdminNewsPage />;
    case 'settings':  return <div className="p-6 text-center text-slate-500">صفحة الإعدادات (قيد التطوير)</div>;
    default:          return <AdminDashboard />;
  }
};

export default function AdminApp() {
  const { isAuthenticated, adminPage } = useAdminStore();

  if (!isAuthenticated) {
    return (
      <>
        <AdminLogin />
        <Toaster position="top-center" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white flex transition-colors duration-300 font-sans" dir="rtl">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 md:p-4">
          <Suspense fallback={<PageLoader />}>
            <AdminRouter page={adminPage} />
          </Suspense>
        </main>
      </div>
      <Toaster position="top-center" toastOptions={{
        className: 'dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700',
      }} />
    </div>
  );
}
