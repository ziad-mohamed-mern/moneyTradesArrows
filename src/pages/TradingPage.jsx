import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle, AlertCircle, ChevronDown, Zap,
} from 'lucide-react';
import { useStore } from '../store/useStore';

// ─── Dummy Data ────────────────────────────────────────────────────────────────

const generateData = (days, base, volatility) => {
  const data = [];
  let price = base;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    price = Math.max(price + (Math.random() - 0.48) * volatility, base * 0.7);
    data.push({
      date: d.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' }),
      price: +price.toFixed(2),
      volume: Math.floor(Math.random() * 500000 + 100000),
    });
  }
  return data;
};

const TIMEFRAMES = [
  { label: '7 أيام', key: '1W', days: 7 },
  { label: 'شهر', key: '1M', days: 30 },
  { label: 'سنة', key: '1Y', days: 365 },
];

const stockData = {
  symbol: 'SHMK',
  name: 'الشمكة المالية',
  sector: 'الخدمات المالية',
  currentPrice: 24.75,
  change: +0.85,
  changePercent: +3.56,
  open: 23.9,
  high: 25.1,
  low: 23.5,
  volume: '2.4M',
  marketCap: '18.3B',
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-emerald-400 font-bold text-lg">{payload[0].value.toFixed(2)} ر.س</p>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TradingPage() {
  const { orders, addOrder, user } = useStore();
  const [timeframe, setTimeframe] = useState('1W');
  const [tradeType, setTradeType] = useState('buy');
  const [qty, setQty] = useState('');
  const [qtyError, setQtyError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const chartData = useMemo(() => {
    const tf = TIMEFRAMES.find((t) => t.key === timeframe);
    return generateData(tf.days, 24, 1.2);
  }, [timeframe]);

  const total = useMemo(() => {
    const n = parseInt(qty);
    return isNaN(n) ? 0 : n * stockData.currentPrice;
  }, [qty]);

  const validate = () => {
    if (!qty || parseInt(qty) <= 0) {
      setQtyError('يرجى إدخال عدد أسهم صحيح');
      return false;
    }
    if (parseInt(qty) > 10000) {
      setQtyError('الحد الأقصى للطلب الواحد 10,000 سهم');
      return false;
    }
    setQtyError('');
    return true;
  };

  const handleExecute = useCallback(() => {
    if (!validate()) return;
    addOrder({
      type: tradeType === 'buy' ? 'شراء' : 'بيع',
      stock: stockData.symbol,
      qty: parseInt(qty),
      price: stockData.currentPrice,
      total: total,
      status: 'قيد التنفيذ',
    });
    setSuccessMsg(`تم تقديم طلب ${tradeType === 'buy' ? 'الشراء' : 'البيع'} بنجاح!`);
    setQty('');
    setTimeout(() => setSuccessMsg(''), 3500);
  }, [qty, tradeType, total, addOrder]);

  const isPositive = stockData.change > 0;

  return (
    <div className="max-w-7xl mx-auto pb-20 md:pb-8 space-y-6">
      {/* ── Page Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-2xl font-bold dark:text-white">التداول</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          تنفيذ أوامر الشراء والبيع في الوقت الفعلي
        </p>
      </motion.div>

      {/* ── Stock Overview Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="premium-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        {/* Stock Identity */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold dark:text-white">{stockData.symbol}</h3>
              <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full font-medium">
                {stockData.sector}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{stockData.name}</p>
          </div>
        </div>

        {/* Price Block */}
        <div className="flex items-end gap-3">
          <div>
            <p className="text-3xl font-bold dark:text-white tabular-nums">
              {stockData.currentPrice.toFixed(2)}
              <span className="text-base font-medium text-slate-400 mr-1">ر.س</span>
            </p>
            <div className={`flex items-center gap-1 mt-1 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span className="font-semibold text-sm">
                {isPositive ? '+' : ''}{stockData.change} ({isPositive ? '+' : ''}{stockData.changePercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Meta Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: 'الافتتاح', value: stockData.open },
            { label: 'الأعلى', value: stockData.high },
            { label: 'الأدنى', value: stockData.low },
            { label: 'الحجم', value: stockData.volume },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl px-3 py-2">
              <p className="text-[10px] text-slate-400 font-medium mb-0.5">{s.label}</p>
              <p className="text-sm font-bold dark:text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Chart + Buy/Sell Panel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 premium-card"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h4 className="font-semibold dark:text-white">حركة السعر</h4>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf.key}
                  onClick={() => setTimeframe(tf.key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${timeframe === tf.key
                      ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[280px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.1)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={55}
                  tickFormatter={(v) => `${v} ر.س`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fill="url(#priceGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Buy/Sell Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="premium-card flex flex-col"
        >
          <h4 className="font-semibold dark:text-white mb-5">تنفيذ الصفقة</h4>

          {/* Trade Type Toggle */}
          <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-5">
            <button
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-3 font-semibold text-sm transition-all ${tradeType === 'buy'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              شراء
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-3 font-semibold text-sm transition-all ${tradeType === 'sell'
                  ? 'bg-red-500 text-white'
                  : 'bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              بيع
            </button>
          </div>

          {/* Stock Info Row */}
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-slate-500">سعر السهم</span>
            <span className="font-bold dark:text-white">{stockData.currentPrice} ر.س</span>
          </div>

          {/* Qty Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
              عدد الأسهم
            </label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => { setQty(e.target.value); setQtyError(''); }}
              placeholder="0"
              className={`w-full border rounded-xl px-4 py-3 text-lg font-bold bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 transition-all tabular-nums ${qtyError
                  ? 'border-red-400 focus:ring-red-400/20'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-primary-400/30 focus:border-primary-400'
                }`}
            />
            {qtyError && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {qtyError}
              </p>
            )}
          </div>

          {/* Total */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 mb-5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">الإجمالي المتوقع</span>
              <span className={`font-bold text-xl tabular-nums ${tradeType === 'buy' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                {total.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ر.س
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-slate-400 text-xs">الرصيد المتاح</span>
              <span className="text-slate-500 text-xs dark:text-slate-400">
                {user?.balance?.toLocaleString()} {user?.currency}
              </span>
            </div>
          </div>

          {/* Success msg */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 rounded-xl flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-sm"
              >
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                {successMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Execute Button */}
          <button
            onClick={handleExecute}
            className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${tradeType === 'buy'
                ? 'bg-gradient-to-l from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/25'
                : 'bg-gradient-to-l from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/25'
              }`}
          >
            <Zap className="w-4 h-4" />
            تنفيذ {tradeType === 'buy' ? 'الشراء' : 'البيع'}
          </button>
        </motion.div>
      </div>

      {/* ── Order History Table ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="premium-card"
      >
        <h4 className="font-semibold dark:text-white mb-5">سجل العمليات</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-100 dark:border-slate-800">
                {['النوع', 'السهم', 'الكمية', 'السعر', 'الإجمالي', 'التاريخ', 'الحالة'].map((h) => (
                  <th key={h} className="pb-3 font-medium text-right px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {orders.map((o, i) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${o.type === 'شراء'
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}>
                      {o.type === 'شراء' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {o.type}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-bold dark:text-white">{o.stock}</td>
                  <td className="py-3 px-2 tabular-nums dark:text-slate-300">{o.qty.toLocaleString()}</td>
                  <td className="py-3 px-2 tabular-nums dark:text-slate-300">{o.price} ر.س</td>
                  <td className="py-3 px-2 font-semibold tabular-nums dark:text-slate-200">
                    {o.total.toLocaleString()} ر.س
                  </td>
                  <td className="py-3 px-2 text-slate-400">{o.date}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${o.status === 'مكتمل'
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300'
                        : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-300'
                      }`}>
                      {o.status === 'مكتمل' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {o.status}
                    </span>
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
