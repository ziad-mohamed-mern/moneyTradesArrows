import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

const data = [
  { name: 'السبت', price: 102.50, vol: 2400 },
  { name: 'الأحد', price: 104.20, vol: 1398 },
  { name: 'الاثنين', price: 101.80, vol: 9800 },
  { name: 'الثلاثاء', price: 105.90, vol: 3908 },
  { name: 'الأربعاء', price: 108.40, vol: 4800 },
  { name: 'الخميس', price: 106.20, vol: 3800 },
  { name: 'الجمعة', price: 109.50, vol: 4300 },
];

const timeframes = ['اليوم', 'أسبوع', 'شهر', 'سنة', 'الكل'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
        <p className="font-bold text-slate-800 dark:text-white mb-2">{label}</p>
        <p className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">
          {payload[0].value.toFixed(2)} ر.س
        </p>
      </div>
    );
  }
  return null;
};

const StockChart = () => {
  const { darkMode } = useStore();
  const [activeTimeframe, setActiveTimeframe] = useState('أسبوع');

  return (
    <div className="premium-card mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold dark:text-white">أداء السهم</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">حركة سهم شركة تجار المال (7 أيام)</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTimeframe === tf 
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={darkMode ? '#38bdf8' : '#0ea5e9'} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={darkMode ? '#38bdf8' : '#0ea5e9'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={darkMode ? '#1e293b' : '#e2e8f0'} 
            />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: darkMode ? '#64748b' : '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: darkMode ? '#64748b' : '#64748b', fontSize: 12, fontFamily: 'monospace' }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={darkMode ? '#38bdf8' : '#0ea5e9'} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
