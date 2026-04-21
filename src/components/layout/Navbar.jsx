import React from 'react';
import { useStore } from '../../store/useStore';
import {
  Search, Bell, Moon, Sun, ChevronDown, Wallet,
} from 'lucide-react';
import { motion } from 'framer-motion';

const PAGE_TITLES = {
  home:      { title: 'لوحة التحكم',   subtitle: 'مرحباً بعودتك' },
  trading:   { title: 'التداول',        subtitle: 'شراء وبيع الأسهم في الوقت الفعلي' },
  portfolio: { title: 'محفظتي',        subtitle: 'تتبع أداء استثماراتك' },
  news:      { title: 'أخبار الشركة',  subtitle: 'آخر المستجدات والإعلانات' },
  settings:  { title: 'الإعدادات',     subtitle: 'تخصيص حسابك وتفضيلاتك' },
};

const Navbar = () => {
  const { darkMode, toggleDarkMode, user, activePage } = useStore();
  const page = PAGE_TITLES[activePage] || PAGE_TITLES.home;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between gap-4">

        {/* Left: Page Title (desktop) */}
        <div className="hidden md:block">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-sm font-bold dark:text-white leading-tight">{page.title}</h2>
            <p className="text-[11px] text-slate-400">{page.subtitle}</p>
          </motion.div>
        </div>

        {/* Mobile Logo */}
        <div className="md:hidden font-bold text-base dark:text-white">تجار المال</div>

        {/* Right: Search + Actions */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none justify-end">

          {/* Search Bar */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl w-56 lg:w-80 group focus-within:ring-2 ring-primary-500/20 transition-all">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="بحث في الأسهم والأخبار..."
              className="bg-transparent border-none outline-none text-sm w-full dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* Wallet Badge */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/40">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[9px] text-emerald-500 font-semibold uppercase tracking-wide">الرصيد</p>
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 tabular-nums leading-tight">
                {user?.balance?.toLocaleString('ar-SA')} {user?.currency}
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
            <img
              src={user?.avatar}
              className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
              alt="Profile"
            />
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold dark:text-white leading-tight">{user?.name}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{user?.role}</p>
            </div>
            <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
