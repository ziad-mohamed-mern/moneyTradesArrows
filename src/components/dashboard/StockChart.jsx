import React, { useState, useMemo } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const data = [
  { name: 'السبت', price: 102.50, vol: 2400 },
  { name: 'الأحد', price: 104.20, vol: 1398 },
  { name: 'الاثنين', price: 101.80, vol: 9800 },
  { name: 'الثلاثاء', price: 105.90, vol: 3908 },
  { name: 'الأربعاء', price: 108.40, vol: 4800 },
  { name: 'الخميس', price: 106.20, vol: 3800 },
  { name: 'الجمعة', price: 109.50, vol: 4300 },
];

const timeframes = [
  { id: 'اليوم', label: 'اليوم', rate: '+1.2%', isPositive: true },
  { id: 'أسبوع', label: 'أسبوع', rate: '+5.8%', isPositive: true },
  { id: 'شهر', label: 'شهر', rate: '+12.4%', isPositive: true },
  { id: 'سنة', label: 'سنة', rate: '-3.2%', isPositive: false },
  { id: 'الكل', label: 'الكل', rate: '+45.0%', isPositive: true },
];

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

  const currentTF = useMemo(() => 
    timeframes.find(t => t.id === activeTimeframe), 
  [activeTimeframe]);

  return (
    <div className="premium-card mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold dark:text-white">أداء السهم</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-sm text-slate-500 dark:text-slate-400">سعر السهم الحالي</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTimeframe}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={`flex items-center gap-1 text-xs font-bold font-mono px-2 py-0.5 rounded-lg ${
                    currentTF.isPositive 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {currentTF.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {currentTF.rate}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 self-start sm:self-center">
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              onClick={() => setActiveTimeframe(tf.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTimeframe === tf.id 
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-lg shadow-black/5' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={darkMode ? '#38bdf8' : '#0ea5e9'} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={darkMode ? '#38bdf8' : '#0ea5e9'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={darkMode ? 'rgba(30,41,59,0.5)' : 'rgba(226,232,240,0.5)'} 
            />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
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
