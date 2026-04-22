import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, Newspaper, Settings,
  LogOut, TrendingUp, Menu, X, ChevronRight,
} from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import authService from '../../services/authService';
import toast from 'react-hot-toast';

const NAV = [
  { id: 'dashboard', label: 'الرئيسية',  icon: LayoutDashboard },
  { id: 'projects',  label: 'المشاريع',  icon: FolderKanban },
  { id: 'news',      label: 'الأخبار',   icon: Newspaper },
  { id: 'settings',  label: 'الإعدادات', icon: Settings },
];

export default function AdminSidebar() {
  const { adminPage, setAdminPage, user, clearAuth } = useAdminStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try { await authService.logout(); } catch {}
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    clearAuth();
    toast.success('تم تسجيل الخروج');
  };

  const NavItem = ({ item }) => {
    const active = adminPage === item.id;
    return (
      <button
        onClick={() => { setAdminPage(item.id); setMobileOpen(false); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
          active
            ? 'bg-gradient-to-l from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
            : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
        }`}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        <span>{item.label}</span>
        {active && <ChevronRight className="w-4 h-4 mr-auto opacity-70" />}
      </button>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">لوحة التحكم</p>
            <p className="text-slate-500 text-[11px]">ArrowsPlatform</p>
          </div>
          <button onClick={() => setMobileOpen(false)} className="md:hidden mr-auto text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-[10px] text-slate-600 uppercase font-semibold tracking-widest px-3 mb-3">
          القائمة الرئيسية
        </p>
        {NAV.map((item) => <NavItem key={item.id} item={item} />)}
      </nav>

      {/* User + Logout */}
      <div className="p-3 border-t border-white/[0.07]">
        <div className="bg-white/[0.05] rounded-xl p-3 flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {(user?.fullName || user?.userName || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-semibold truncate">{user?.fullName || user?.userName || 'المشرف'}</p>
            <p className="text-slate-500 text-xs truncate">{user?.email || 'admin'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 right-4 z-[150] w-10 h-10 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center text-white shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-[150] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 right-0 h-screen w-64
        bg-[#0c1524] border-l border-white/[0.07]
        z-[160] transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <SidebarContent />
      </aside>
    </>
  );
}
