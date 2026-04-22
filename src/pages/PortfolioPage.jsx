import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  TrendingUp, TrendingDown, Wallet, Package, BarChart2,
  ArrowUpRight, ArrowDownRight,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const portfolioGrowth = [
  { month: 'أكتوبر', value: 82000 },
  { month: 'نوفمبر', value: 88500 },
  { month: 'ديسمبر', value: 84200 },
  { month: 'يناير',  value: 95800 },
  { month: 'فبراير', value: 102300 },
  { month: 'مارس',   value: 110000 },
  { month: 'أبريل',  value: 118740 },
];

const holdings = [
  { symbol: 'SHMK',   name: 'الشمكة المالية',     qty: 500,  avgPrice: 20.5,  currentPrice: 24.75, color: '#3b82f6' },
  { symbol: 'ARAMCO', name: 'أرامكو السعودية',     qty: 120,  avgPrice: 26.0,  currentPrice: 28.80, color: '#f59e0b' },
  { symbol: 'STC',    name: 'الاتصالات السعودية',  qty: 200,  avgPrice: 42.0,  currentPrice: 45.20, color: '#8b5cf6' },
  { symbol: 'SABIC',  name: 'سابك',                qty: 80,   avgPrice: 95.0,  currentPrice: 88.50, color: '#ef4444' },
  { symbol: 'RIYAD',  name: 'بنك الرياض',          qty: 300,  avgPrice: 18.0,  currentPrice: 20.10, color: '#10b981' },
];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.06 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-slate-300 text-xs mb-1">{payload[0].payload.month}</p>
      <p className="text-emerald-400 font-bold">{payload[0].value.toLocaleString()} ر.س</p>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const enriched = useMemo(() =>
    holdings.map((h) => {
      const totalCost   = h.qty * h.avgPrice;
      const currentVal  = h.qty * h.currentPrice;
      const profit      = currentVal - totalCost;
      const profitPct   = (profit / totalCost) * 100;
      return { ...h, totalCost, currentVal, profit, profitPct };
    }), []);

  const totalInvested = enriched.reduce((s, h) => s + h.totalCost, 0);
  const totalValue    = enriched.reduce((s, h) => s + h.currentVal, 0);
  const totalProfit   = totalValue - totalInvested;
  const totalProfitPct = (totalProfit / totalInvested) * 100;
  const totalShares    = enriched.reduce((s, h) => s + h.qty, 0);

  const pieData = enriched.map((h) => ({
    name: h.symbol,
    value: +h.currentVal.toFixed(0),
    color: h.color,
  }));

  const summaryCards = [
    {
      icon: Wallet,
      label: 'إجمالي الاستثمار',
      value: totalValue.toLocaleString('ar-SA', { maximumFractionDigits: 0 }) + ' ر.س',
      sub: `تكلفة: ${totalInvested.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ر.س`,
      color: 'blue',
    },
    {
      icon: totalProfit >= 0 ? TrendingUp : TrendingDown,
      label: totalProfit >= 0 ? 'الأرباح' : 'الخسائر',
      value: (totalProfit >= 0 ? '+' : '') + totalProfit.toLocaleString('ar-SA', { maximumFractionDigits: 0 }) + ' ر.س',
      sub: `${totalProfit >= 0 ? '+' : ''}${totalProfitPct.toFixed(2)}%`,
      color: totalProfit >= 0 ? 'emerald' : 'red',
    },
    {
      icon: Package,
      label: 'عدد الأسهم',
      value: totalShares.toLocaleString(),
      sub: `${enriched.length} شركات`,
      color: 'violet',
    },
    {
      icon: BarChart2,
      label: 'أفضل أداء',
      value: enriched.reduce((b, h) => h.profitPct > b.profitPct ? h : b, enriched[0]).symbol,
      sub: `+${enriched.reduce((b, h) => h.profitPct > b.profitPct ? h : b, enriched[0]).profitPct.toFixed(1)}%`,
      color: 'amber',
    },
  ];

  const colorMap = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    violet: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 md:pb-8 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold dark:text-white">محفظتي</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          نظرة شاملة على أداء استثماراتك
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="premium-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[card.color]}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{card.label}</p>
            <p className={`text-xl font-bold ${card.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : card.color === 'red' ? 'text-red-500' : 'dark:text-white'}`}>
              {card.value}
            </p>
            <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Growth Chart + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 premium-card"
        >
          <h4 className="font-semibold dark:text-white mb-5">نمو المحفظة</h4>
          <div className="w-full h-[240px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioGrowth}>
                <defs>
                  <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.1)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={70}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#portfolioGrad)" dot={false} activeDot={{ r: 5, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="premium-card flex flex-col"
        >
          <h4 className="font-semibold dark:text-white mb-4">توزيع الأصول</h4>
          <div className="w-full h-[200px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={renderLabel}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => [`${v.toLocaleString()} ر.س`]}
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-slate-500 dark:text-slate-400">{d.name}</span>
                </div>
                <span className="font-medium dark:text-slate-300">{((d.value / totalValue) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Holdings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="premium-card"
      >
        <h4 className="font-semibold dark:text-white mb-5">الأسهم في المحفظة</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-100 dark:border-slate-800">
                {['السهم', 'الكمية', 'متوسط السعر', 'السعر الحالي', 'القيمة الحالية', 'الربح / الخسارة'].map((h) => (
                  <th key={h} className="pb-3 font-medium text-right px-2 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {enriched.map((h, i) => (
                <motion.tr
                  key={h.symbol}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: h.color + '22' }}>
                        <span className="text-xs font-bold" style={{ color: h.color }}>{h.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-semibold dark:text-white">{h.symbol}</p>
                        <p className="text-xs text-slate-400">{h.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 tabular-nums dark:text-slate-300">{h.qty.toLocaleString()}</td>
                  <td className="py-4 px-2 tabular-nums dark:text-slate-300">{h.avgPrice} ر.س</td>
                  <td className="py-4 px-2 tabular-nums font-medium dark:text-white">{h.currentPrice} ر.س</td>
                  <td className="py-4 px-2 tabular-nums font-semibold dark:text-slate-200">
                    {h.currentVal.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ر.س
                  </td>
                  <td className="py-4 px-2">
                    <div className={`flex items-center gap-1 font-semibold ${h.profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                      {h.profit >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      <span className="tabular-nums">
                        {h.profit >= 0 ? '+' : ''}{h.profit.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ر.س
                      </span>
                      <span className="text-xs opacity-70">
                        ({h.profit >= 0 ? '+' : ''}{h.profitPct.toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
