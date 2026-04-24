import { getNewsById } from '@/lib/api';
import { Calendar, ChevronRight, User, Clock, Share2, Printer } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

/**
 * News Detail Page - Server Component
 * Fetches a single news item by ID and displays full content.
 */
export default async function NewsDetailPage({ params }) {
  // Await params in Next.js 15+ or destructure in older versions
  const { id } = await params;
  
  // Fetch single news item
  const newsItem = await getNewsById(id);

  // Handle case where news item is not found
  if (!newsItem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-20" dir="rtl">
      {/* Article Header & Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href="/news" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 mb-10 transition-all hover:-translate-x-1"
        >
          <ChevronRight className="w-4 h-4" /> العودة لقائمة الأخبار
        </Link>

        <article className="space-y-10">
          {/* Metadata & Title */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                <Calendar className="w-4 h-4 text-primary-500" />
                {newsItem.date || '24 أبريل 2026'}
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                <User className="w-4 h-4 text-primary-500" />
                فريق التحرير
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                <Clock className="w-4 h-4 text-primary-500" />
                قراءة في {newsItem.readTime || '5 دقائق'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black dark:text-white leading-[1.2] tracking-tight">
              {newsItem.title}
            </h1>

            {/* Quick Actions */}
            <div className="flex gap-3 pt-2">
              <button className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary-600 transition-colors">
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Main Image */}
          {newsItem.image && (
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-900/10 border-8 border-white dark:border-slate-900">
              <img 
                src={newsItem.image} 
                alt={newsItem.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="premium-card bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border-none">
            <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none">
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-8 border-r-4 border-primary-500 pr-6">
                {newsItem.summary || (newsItem.content ? newsItem.content.substring(0, 150) + '...' : '')}
              </p>
              
              <div className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-[1.8] whitespace-pre-wrap">
                {newsItem.content}
              </div>
            </div>

            {/* Footer Tag/Category */}
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400">التصنيف:</span>
              <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold text-primary-600">
                {newsItem.category || 'أخبار عامة'}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
