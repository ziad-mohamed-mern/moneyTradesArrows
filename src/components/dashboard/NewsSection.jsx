import React from 'react';
import { Newspaper, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const newsItems = [
  {
    id: 1,
    title: 'توزيع أرباح نقدية على المساهمين عن النصف الأول 2024',
    date: 'قبل ساعتين',
    category: 'إعلان الشركة',
    isImportant: true,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'ارتفاع أرباح الشركة بنسبة 15% مقارنة بالعام الماضي',
    date: 'الأمس',
    category: 'نتائج مالية',
    isImportant: false,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'استحواذ جديد يعزز من مكانة الشركة في السوق',
    date: 'منذ 3 أيام',
    category: 'أخبار السوق',
    isImportant: false,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop'
  }
];

const NewsSection = () => {
  return (
    <div className="premium-card mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-primary-500" />
          أحدث الأخبار والإعلانات
        </h3>
        <button className="text-sm font-medium text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center">
          عرض الكل
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map((news, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={news.id} 
            className="group cursor-pointer flex flex-col"
          >
            <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
              <img 
                src={news.image} 
                alt={news.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {news.isImportant && (
                <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  هام
                </div>
              )}
              <div className="absolute bottom-3 right-3">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md border border-white/20">
                  {news.category}
                </span>
              </div>
            </div>
            
            <h4 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-relaxed">
              {news.title}
            </h4>
            <p className="text-xs text-slate-500 mt-auto">{news.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
