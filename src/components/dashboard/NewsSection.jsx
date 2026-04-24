import React from 'react';
import { Newspaper, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { news as staticNews } from '../../data/newsData';

const NewsSection = () => {
  const navigate = useNavigate();
  // Get latest 3 news items
  const displayNews = staticNews.slice(0, 3);

  return (
    <div className="premium-card mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-primary-500" />
          أحدث الأخبار والإعلانات
        </h3>
        <Link 
          to="/news"
          className="text-sm font-medium text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1 group"
        >
          عرض الكل
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayNews.map((news, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={news.id} 
            onClick={() => navigate(`/news/${news.id}`)}
            className="group cursor-pointer flex flex-col h-full"
          >
            <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-800 shadow-sm">
              <img 
                src={news.image} 
                alt={news.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
              
              {news.featured && (
                <div className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg">
                  هام
                </div>
              )}
              
              <div className="absolute bottom-3 right-3">
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-lg border border-white/20 font-medium">
                  {news.category}
                </span>
              </div>
            </div>
            
            <h4 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-relaxed">
              {news.title}
            </h4>
            
            <div className="mt-auto flex items-center justify-between">
              <p className="text-[10px] text-slate-500 font-medium">{news.date}</p>
              <span className="text-[10px] font-bold text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                التفاصيل <ChevronLeft className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
