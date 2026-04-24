import React from 'react';
import { Wallet, ChevronLeft, Activity, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PortfolioStats = () => {
  return (
    <div className="premium-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary-500" />
          محفظتي
        </h3>
        <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 group">
          التفاصيل
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">القيمة الإجمالية</p>
          <h4 className="text-3xl font-bold dark:text-white tabular-nums tracking-tight">
            185,420.50 <span className="text-lg text-slate-400">ر.س</span>
          </h4>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              +4.2%
            </span>
            <span className="text-xs text-slate-500">منذ الشهر الماضي</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center shrink-0">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">متوسط الشراء</p>
              <p className="font-bold dark:text-white font-mono">98.50</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">عدد الأسهم</p>
              <p className="font-bold dark:text-white font-mono">1,850</p>
            </div>
          </div>
        </div>

        <Link to="/trading">
          <button className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2">
            شراء المزيد
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PortfolioStats;
