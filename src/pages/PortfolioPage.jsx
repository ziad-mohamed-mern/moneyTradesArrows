import React, { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Wallet, Package, BarChart2,
  ArrowRight, ArrowUpRight, ArrowDownRight, Zap, AlertCircle, CheckCircle,
} from 'lucide-react';
import { useStore } from '../store/useStore';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const holdings = [
  { symbol: 'SHMK', name: 'الشمكة المالية', qty: 500, avgPrice: 20.5, currentPrice: 24.75, color: '#3b82f6' },
  { symbol: 'ARAMCO', name: 'أرامكو السعودية', qty: 120, avgPrice: 26.0, currentPrice: 28.80, color: '#f59e0b' },
  { symbol: 'STC', name: 'الاتصالات السعودية', qty: 200, avgPrice: 42.0, currentPrice: 45.20, color: '#8b5cf6' },
  { symbol: 'SABIC', name: 'سابك', qty: 80, avgPrice: 95.0, currentPrice: 88.50, color: '#ef4444' },
  { symbol: 'RIYAD', name: 'بنك الرياض', qty: 300, avgPrice: 18.0, currentPrice: 20.10, color: '#10b981' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { addOrder, user } = useStore();
  const [tradeType, setTradeType] = useState('buy');
  const [selectedSymbol, setSelectedSymbol] = useState(holdings[0].symbol);
  const [qty, setQty] = useState('');
  const [qtyError, setQtyError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const enriched = useMemo(() =>
    holdings.map((h) => {
      const totalCost = h.qty * h.avgPrice;
      const currentVal = h.qty * h.currentPrice;
      const profit = currentVal - totalCost;
      const profitPct = (profit / totalCost) * 100;
      return { ...h, totalCost, currentVal, profit, profitPct };
    }), []);

  const totalInvested = enriched.reduce((s, h) => s + h.totalCost, 0);
  const totalValue = enriched.reduce((s, h) => s + h.currentVal, 0);
  const totalProfit = totalValue - totalInvested;
  const totalProfitPct = (totalProfit / totalInvested) * 100;
  const totalShares = enriched.reduce((s, h) => s + h.qty, 0);

  const selectedHolding = enriched.find((h) => h.symbol === selectedSymbol) ?? enriched[0];

  const total = useMemo(() => {
    const n = parseInt(qty, 10);
    return Number.isNaN(n) ? 0 : n * selectedHolding.currentPrice;
  }, [qty, selectedHolding.currentPrice]);

  const validate = () => {
    const n = parseInt(qty, 10);
    if (!qty || n <= 0) {
      setQtyError('يرجى إدخال عدد أسهم صحيح');
      return false;
    }
    if (n > 10000) {
      setQtyError('الحد الأقصى للطلب الواحد 10,000 سهم');
      return false;
    }
    if (tradeType === 'sell' && n > selectedHolding.qty) {
      setQtyError(`الحد الأقصى للبيع ${selectedHolding.qty} سهم`);
      return false;
    }
    setQtyError('');
    return true;
  };

  const handleExecute = useCallback(() => {
    if (!validate()) return;
    addOrder({
      type: tradeType === 'buy' ? 'شراء' : 'بيع',
      stock: selectedHolding.symbol,
      qty: parseInt(qty, 10),
      price: selectedHolding.currentPrice,
      total,
      status: 'قيد التنفيذ',
    });
    setSuccessMsg(`تم تقديم طلب ${tradeType === 'buy' ? 'الشراء' : 'البيع'} بنجاح!`);
    setQty('');
    setTimeout(() => setSuccessMsg(''), 3500);
  }, [qty, tradeType, total, addOrder, selectedHolding]);

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

      {/* Buy / Sell */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="premium-card"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold dark:text-white">شراء وبيع الأسهم</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              نفّذ صفقة سريعة من محفظتك
            </p>
          </div>
          <Link
            to="/trading"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary-600 dark:text-gold-400 hover:underline group"
          >
            التداول المتقدم
            <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Holdings picker */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">اختر السهم</label>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {enriched.map((h) => {
                const isSelected = h.symbol === selectedSymbol;
                const isUp = h.profit >= 0;
                return (
                  <button
                    key={h.symbol}
                    type="button"
                    onClick={() => setSelectedSymbol(h.symbol)}
                    className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl border transition-all text-right ${
                      isSelected
                        ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-400/20'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: h.color }}
                      >
                        {h.symbol.slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold dark:text-white text-sm">{h.symbol}</p>
                        <p className="text-xs text-slate-500 truncate">{h.name}</p>
                      </div>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <p className="font-bold dark:text-white tabular-nums text-sm">{h.currentPrice} ر.س</p>
                      <p className={`text-xs flex items-center justify-end gap-0.5 ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {isUp ? '+' : ''}{h.profitPct.toFixed(1)}%
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trade form */}
          <div className="flex flex-col">
            <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-5">
              <button
                type="button"
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-3 font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${
                  tradeType === 'buy'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                شراء
              </button>
              <button
                type="button"
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-3 font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${
                  tradeType === 'sell'
                    ? 'bg-red-500 text-white'
                    : 'bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                بيع
              </button>
            </div>

            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-slate-500">سعر السهم</span>
              <span className="font-bold dark:text-white tabular-nums">
                {selectedHolding.currentPrice} ر.س
              </span>
            </div>
            {tradeType === 'sell' && (
              <p className="text-xs text-slate-400 mb-3">
                متاح للبيع: <span className="font-semibold text-slate-600 dark:text-slate-300">{selectedHolding.qty} سهم</span>
              </p>
            )}

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
                className={`input-base text-lg font-bold tabular-nums ${
                  qtyError ? 'border-red-400 focus:ring-red-400/20' : ''
                }`}
              />
              {qtyError && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {qtyError}
                </p>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">الإجمالي المتوقع</span>
                <span
                  className={`font-bold text-xl tabular-nums ${
                    tradeType === 'buy' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                  }`}
                >
                  {total.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ر.س
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-400 text-xs">الرصيد المتاح</span>
                <span className="text-slate-500 text-xs dark:text-slate-400 tabular-nums">
                  {user?.balance?.toLocaleString()} {user?.currency}
                </span>
              </div>
            </div>

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

            <button
              type="button"
              onClick={handleExecute}
              className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                tradeType === 'buy'
                  ? 'bg-gradient-to-l from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/25'
                  : 'bg-gradient-to-l from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/25'
              }`}
            >
              <Zap className="w-4 h-4" />
              تنفيذ {tradeType === 'buy' ? 'الشراء' : 'البيع'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
