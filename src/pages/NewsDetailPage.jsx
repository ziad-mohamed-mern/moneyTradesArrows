import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ChevronRight, Share2, Printer, AlertTriangle } from 'lucide-react';
import { news as staticNews } from '../data/newsData';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the news item in the static data array
  const newsItem = staticNews.find((n) => n.id === parseInt(id));

  if (!newsItem) {
    return (
      <div className="py-20 premium-card text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-xl font-bold dark:text-white">الخبر غير موجود</h3>
        <p className="text-slate-500">عذراً، لم نتمكن من العثور على هذا الخبر في سجلاتنا.</p>
        <button onClick={() => navigate('/news')} className="btn-primary py-2 px-6">العودة للأخبار</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <motion.button
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/news')}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 mb-8 transition-all hover:-translate-x-1"
      >
        <ChevronRight className="w-4 h-4" /> العودة لقائمة الأخبار
      </motion.button>

      <article className="space-y-10">
        {/* Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
              <Calendar className="w-4 h-4 text-primary-500" />
              {newsItem.date}
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
              <User className="w-4 h-4 text-primary-500" />
              فريق التحرير
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
              <Clock className="w-4 h-4 text-primary-500" />
              {newsItem.readTime}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black dark:text-white leading-[1.2] tracking-tight">
            {newsItem.title}
          </h1>

          <div className="flex gap-3 pt-2">
            <button className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary-600 transition-colors">
              <Printer className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {newsItem.image && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900"
          >
            <img 
              src={newsItem.image} 
              alt={newsItem.title} 
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="premium-card bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12"
        >
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium border-r-4 border-primary-500 pr-6">
              {newsItem.summary}
            </p>
            
            <div className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-[1.8] whitespace-pre-wrap">
              {newsItem.content}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400">التصنيف:</span>
            <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold text-primary-600">
              {newsItem.category}
            </span>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
