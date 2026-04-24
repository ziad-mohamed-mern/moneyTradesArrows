import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, Search, Tag, Newspaper, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { news as staticNews } from '../data/newsData';

const CATEGORIES = ['الكل', 'استثمارات', 'مشاريع', 'إعلانات'];

const NewsCard = ({ item, index, onClick }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.07 }}
    onClick={onClick}
    className="premium-card overflow-hidden p-0 group cursor-pointer h-full flex flex-col"
  >
    <div className="relative overflow-hidden h-48">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute top-3 right-3">
        <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
          {item.category}
        </span>
      </div>
    </div>

    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center gap-3 mb-3 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-primary-500" /> {item.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-primary-500" /> {item.readTime}
        </span>
      </div>

      <h3 className="font-bold dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
        {item.summary}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
          اقرأ المزيد <ChevronLeft className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </motion.article>
);

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() =>
    staticNews.filter((n) => {
      const matchCat = activeCategory === 'الكل' || n.category === activeCategory;
      const matchSearch =
        searchQuery === '' ||
        n.title.includes(searchQuery) ||
        n.summary.includes(searchQuery);
      return matchCat && matchSearch;
    }), [activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold dark:text-white">أخبار الشركة</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">آخر المستجدات والإعلانات الرسمية</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الأخبار..."
            className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary-400/30"
          />
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item, i) => (
              <NewsCard 
                key={item.id} 
                item={item} 
                index={i} 
                onClick={() => navigate(`/news/${item.id}`)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 premium-card text-slate-400"
          >
            <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>لا توجد أخبار تطابق بحثك</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
