import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, Briefcase, Newspaper, Settings,
  X, Menu, TrendingUp, Home, LogOut
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../hooks/useAuth';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: Home, label: 'الرئيسية', path: '/' },
  { icon: BarChart2, label: 'التداول', path: '/trading' },
  { icon: Briefcase, label: 'محفظتي', path: '/portfolio' },
  { icon: Newspaper, label: 'أخبار الشركة', path: '/news' },
  { icon: Settings, label: 'الإعدادات', path: '/settings' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="فتح القائمة"
        className="md:hidden fixed top-4 right-4 z-50 p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <Menu className="w-5 h-5 dark:text-white" />
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed md:sticky top-0 right-0 h-screen w-72 bg-white dark:bg-slate-900',
          'border-l border-slate-200 dark:border-slate-800 z-[70] transition-all duration-300 flex flex-col',
          !isOpen && 'translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold dark:text-white leading-tight">تجار المال</h1>
            <p className="text-[11px] text-slate-400">للاستثمار المالي</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">
            القائمة الرئيسية
          </p>
          {menuItems.map((item) => {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium group relative',
                  isActive
                    ? 'bg-gradient-to-l from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-900/10 text-primary-700 dark:text-primary-300'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-700 dark:hover:text-slate-200'
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-600 rounded-l-full"
                      />
                    )}
                    <item.icon
                      className={cn(
                        'w-5 h-5 flex-shrink-0 transition-colors',
                        isActive ? 'text-primary-600 dark:text-primary-400' : 'group-hover:text-primary-500'
                      )}
                    />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="mr-auto w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>


        {/* User Card */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div
            className="w-full bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 font-bold">
              {user?.fullName?.charAt(0) || user?.userName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 text-right min-w-0">
              <p className="text-sm font-semibold truncate dark:text-white">{user?.fullName || user?.userName}</p>
              <p className="text-xs text-slate-400 truncate">{user?.roles?.[0] || 'مستثمر'}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;

