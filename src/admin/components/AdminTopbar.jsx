import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';

const PAGE_TITLES = {
  dashboard: { title: 'الرئيسية',  subtitle: 'نظرة عامة على النظام' },
  projects:  { title: 'المشاريع', subtitle: 'إدارة وعرض جميع المشاريع' },
  news:      { title: 'الأخبار',  subtitle: 'إدارة وعرض جميع الأخبار' },
  settings:  { title: 'الإعدادات', subtitle: 'إعدادات النظام' },
};

export default function AdminTopbar() {
  const { adminPage, user } = useAdminStore();
  const page = PAGE_TITLES[adminPage] || PAGE_TITLES.dashboard;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-white/[0.07] px-6 py-3.5 flex items-center justify-between gap-4">
      {/* Page Title */}
      <div className="hidden md:block">
        <h1 className="text-base font-bold text-slate-800 dark:text-white">{page.title}</h1>
        <p className="text-xs text-slate-400 mt-0.5">{page.subtitle}</p>
      </div>
      <div className="md:hidden font-bold text-slate-800 dark:text-white text-sm">لوحة التحكم</div>

      {/* Right side */}
      <div className="flex items-center gap-3 mr-auto">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.07] px-3 py-2 rounded-xl w-52">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="بحث..."
            className="bg-transparent text-sm outline-none w-full text-slate-700 dark:text-white placeholder:text-slate-400"
          />
        </div>

        {/* Bell */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors">
          <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
          <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#111827]" />
        </button>

        {/* User badge */}
        <div className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.07]">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
            {(user?.fullName || user?.userName || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 dark:text-white leading-tight">
              {user?.fullName || user?.userName || 'المشرف'}
            </p>
            <p className="text-[10px] text-slate-400">مشرف النظام</p>
          </div>
        </div>
      </div>
    </header>
  );
}
