import Link from 'next/link';
import { getNews } from '@/lib/api';
import { Calendar, ChevronLeft, ChevronRight, Newspaper, Clock } from 'lucide-react';

/**
 * News Page - Server Component
 * Fetches dynamic news data from the API with pagination support.
 */
export default async function NewsPage({ searchParams }) {
  // Read page from searchParams, default to 1
  const page = parseInt(searchParams?.page) || 1;
  const pageSize = 9;
  
  // Fetch data using the helper
  const response = await getNews(page, pageSize);
  
  // Handle different API response formats
  const newsItems = response?.data || response?.items || response?.news || (Array.isArray(response) ? response : []);
  const totalCount = response?.totalCount || newsItems.length;
  const totalPages = response?.totalPages || Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10" dir="rtl">
      {/* Page Title & Intro */}
      <div className="space-y-2 border-r-4 border-primary-600 pr-6">
        <h1 className="text-4xl font-black tracking-tight dark:text-white">أخبار الشركة</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          تابع آخر التطورات، الشراكات، والتقارير المالية لشركة تجار المال.
        </p>
      </div>

      {/* News Grid */}
      {newsItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Link key={item.id || index} href={`/news/${item.id}`} className="group h-full">
              <article className="premium-card overflow-hidden p-0 h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2">
                {/* Image Wrapper */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={item.image || `https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Badge if available */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category || 'أخبار'}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary-500" />
                      {item.date || '24 أبريل 2026'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary-500" />
                      {item.readTime || '4 دقائق'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 dark:text-white group-hover:text-primary-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {item.summary || (item.content ? item.content.substring(0, 120) + '...' : 'لا يوجد ملخص متاح لهذا الخبر.')}
                  </p>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      اقرأ المزيد <ChevronLeft className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 premium-card flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
            <Newspaper className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold dark:text-white">لا توجد أخبار حالياً</h2>
          <p className="text-slate-500 max-w-xs mx-auto">نحن نعمل على جلب آخر المستجدات لك، يرجى المحاولة مرة أخرى لاحقاً.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 pt-12">
          <Link
            href={`/news?page=${page - 1}`}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm ${
              page <= 1 
                ? 'pointer-events-none opacity-20 bg-slate-100 dark:bg-slate-800 text-slate-400' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-primary-400 hover:text-primary-600 hover:shadow-lg'
            }`}
          >
            <ChevronRight className="w-5 h-5" /> السابق
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="bg-primary-600 text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold shadow-lg shadow-primary-500/30">
              {page}
            </span>
            <span className="text-slate-400 font-medium">من {totalPages}</span>
          </div>
          
          <Link
            href={`/news?page=${page + 1}`}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm ${
              page >= totalPages 
                ? 'pointer-events-none opacity-20 bg-slate-100 dark:bg-slate-800 text-slate-400' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-primary-400 hover:text-primary-600 hover:shadow-lg'
            }`}
          >
            التالي <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
}
