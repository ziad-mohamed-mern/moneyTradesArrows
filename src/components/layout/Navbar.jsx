import React from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../hooks/useAuth';
import {
  Search, Bell, Moon, Sun, ChevronDown, Wallet,
} from 'lucide-react';
import { motion } from 'framer-motion';

const PAGE_TITLES = {
  '/': { title: 'لوحة التحكم', subtitle: 'مرحباً بعودتك' },
  '/trading': { title: 'التداول', subtitle: 'شراء وبيع الأسهم في الوقت الفعلي' },
  '/portfolio': { title: 'محفظتي', subtitle: 'تتبع أداء استثماراتك' },
  '/news': { title: 'أخبار الشركة', subtitle: 'آخر المستجدات والإعلانات' },
  '/settings': { title: 'الإعدادات', subtitle: 'تخصيص حسابك وتفضيلاتك' },
};

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useStore();
  const { user } = useAuth();
  const location = useLocation();
  const page = PAGE_TITLES[location.pathname] || PAGE_TITLES['/'];

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between gap-4">

        {/* Left: Page Title (desktop) */}
        <div className="hidden md:block">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-sm font-bold dark:text-white leading-tight">{page.title}</h2>
            <p className="text-[11px] text-slate-400">{page.subtitle}</p>
          </motion.div>
        </div>

        {/* Mobile Logo (only on tiny screens where ticker might be hidden) */}
        <div className="xs:hidden font-bold text-base dark:text-white">تجار المال</div>

        {/* Center: Trading Ticker (Advertisement) */}
        <div className="flex flex-1 max-w-xl mx-2 md:mx-4 lg:mx-8 overflow-hidden bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 py-1.5 md:py-2 px-3 md:px-4 relative group">
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[1, 2].map((loop) => (
              <div key={loop} className="flex items-center gap-8 shrink-0 pr-8">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">ARAMCO</span>
                  <span className="text-sm font-bold dark:text-white">32.45</span>
                  <span className="text-[10px] font-bold text-emerald-500">▲ +0.12%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">SABIC</span>
                  <span className="text-sm font-bold dark:text-white">91.20</span>
                  <span className="text-[10px] font-bold text-rose-500">▼ -0.45%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">STC</span>
                  <span className="text-sm font-bold dark:text-white">42.10</span>
                  <span className="text-[10px] font-bold text-emerald-500">▲ +0.05%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">MAADEN</span>
                  <span className="text-sm font-bold dark:text-white">54.30</span>
                  <span className="text-[10px] font-bold text-emerald-500">▲ +1.20%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">SAR/USD</span>
                  <span className="text-sm font-bold dark:text-white">3.75</span>
                  <span className="text-[10px] font-bold text-slate-400">0.00%</span>
                </div>
              </div>
            ))}
          </motion.div>
          {/* Fades */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-50 dark:from-slate-800/40 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-800/40 to-transparent pointer-events-none" />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4 flex-none justify-end">
          {/* Wallet Badge */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/40">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[9px] text-emerald-500 font-semibold uppercase tracking-wide">الرصيد</p>
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 tabular-nums leading-tight">
                {(user?.balance || 0).toLocaleString('ar-SA')} {user?.currency || 'ر.س'}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-700" />

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="تبديل الثيم"
          >
            {darkMode
              ? <Sun className="w-4.5 h-4.5 w-[18px] h-[18px]" />
              : <Moon className="w-[18px] h-[18px]" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

          {/* User */}
          <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 text-xs font-bold border-2 border-white dark:border-slate-700 shadow-sm">
              {user?.fullName?.charAt(0) || user?.userName?.charAt(0) || 'U'}
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold dark:text-white leading-tight">{user?.fullName || user?.userName}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{user?.roles?.[0] || 'مستثمر'}</p>
            </div>
            <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};


export default Navbar;
