import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShoppingBag, CheckCircle, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const stats = [
  {
    label: 'عدد الأسهم',
    value: '24,500',
    trend: '+12%',
    isPositive: true,
    icon: Layers,
    color: 'blue'
  },
  {
    label: 'الأسهم المباعة',
    value: '8,200',
    trend: '-3%',
    isPositive: false,
    icon: ShoppingBag,
    color: 'rose'
  },
  {
    label: 'الأسهم المتاحة',
    value: '16,300',
    trend: '+5%',
    isPositive: true,
    icon: CheckCircle,
    color: 'emerald'
  },
  {
    label: 'الأرباح المحققة',
    value: '12,430 ر.س',
    trend: '+18%',
    isPositive: true,
    icon: TrendingUp,
    color: 'amber'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const StatsGrid = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          variants={item}
          className="premium-card group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-lg shadow-black/5",
              stat.color === 'blue' && "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
              stat.color === 'rose' && "bg-rose-50 dark:bg-rose-900/20 text-rose-600",
              stat.color === 'emerald' && "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600",
              stat.color === 'amber' && "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
            )}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className={cn(
              "px-2 py-1 rounded-lg text-xs font-bold font-mono",
              stat.isPositive ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/10" : "text-rose-500 bg-rose-50 dark:bg-rose-900/10"
            )}>
              {stat.trend}
            </div>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold dark:text-white tabular-nums">{stat.value}</h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;
