import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, ChevronLeft, Search, Star, Megaphone, Zap } from 'lucide-react';

// ─── Mock News Data ───────────────────────────────────────────────────────────
/*
 * Image prompts for Gemini (DO NOT embed real images — use placeholder URLs):
 * [0] "Modern business meeting about investment strategies, dark blue theme, cinematic lighting, high quality"
 * [1] "Saudi Arabia stock market trading floor, digital screens with charts, professional environment, ultra realistic"
 * [2] "Futuristic technology lab, AI and data visualization screens, blue tones, ultra realistic"
 * [3] "Real estate development project in Saudi Arabia, aerial view, golden hour lighting, cinematic"
 * [4] "Corporate board meeting, executives discussing financial growth, dark premium interior"
 * [5] "Green energy and solar panels in desert, sustainable investment, wide angle, professional photography"
 * [6] "Digital banking app interface on phone, financial technology, modern design, high detail"
 */

const CATEGORIES = ['الكل', 'استثمارات', 'مشاريع', 'إعلانات'];

const BADGE_STYLES = {
  مهم:   { bg: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 border-red-100 dark:border-red-800/30', icon: Star },
  إعلان: { bg: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800/30', icon: Megaphone },
  جديد:  { bg: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/30', icon: Zap },
};

const news = [
  {
    id: 1,
    title: 'تجار المال تحقق أرباحاً قياسية في الربع الأول من 2026',
    excerpt: 'أعلنت شركة تجار المال للاستثمار عن نتائج مالية استثنائية للربع الأول، بزيادة في صافي الأرباح بلغت 38٪ مقارنةً بالعام الماضي، مدفوعةً بنمو محافظ العملاء وتوسع في قطاعات الطاقة والتقنية.',
    category: 'استثمارات',
    badge: 'مهم',
    date: '21 أبريل 2026',
    readTime: '4 دقائق',
    featured: true,
    imgPrompt: 'Modern investment company headquarters, financial success concept, dark blue premium interior, cinematic',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format',
  },
  {
    id: 2,
    title: 'إطلاق منصة التداول الذكي بتقنية الذكاء الاصطناعي',
    excerpt: 'تُطلق الشركة منصتها الجديدة المدعومة بالذكاء الاصطناعي لتحليل الأسواق وتقديم توصيات استثمارية دقيقة للمتداولين.',
    category: 'إعلانات',
    badge: 'جديد',
    date: '19 أبريل 2026',
    readTime: '3 دقائق',
    featured: false,
    img: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80&auto=format',
  },
  {
    id: 3,
    title: 'توسع استراتيجي في قطاع العقارات بالرياض',
    excerpt: 'وقّعت الشركة اتفاقية شراكة استراتيجية مع كبرى شركات التطوير العقاري لاستثمار مليار ريال في مشاريع سكنية وتجارية.',
    category: 'مشاريع',
    badge: 'مهم',
    date: '17 أبريل 2026',
    readTime: '5 دقائق',
    featured: false,
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format',
  },
  {
    id: 4,
    title: 'الاجتماع السنوي للمساهمين يُقرّ توزيع أرباح نقدية',
    excerpt: 'صوّت مجلس الإدارة على توزيع أرباح نقدية بقيمة 2.5 ريال للسهم الواحد، وذلك تقديراً لثقة المساهمين الكرام.',
    category: 'إعلانات',
    badge: 'إعلان',
    date: '15 أبريل 2026',
    readTime: '2 دقائق',
    featured: false,
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format',
  },
  {
    id: 5,
    title: 'الاستثمار في الطاقة المتجددة: خطة 2030',
    excerpt: 'ضمن رؤية 2030، تُخصص الشركة 500 مليون ريال لمشاريع الطاقة الشمسية وطاقة الرياح في المناطق الشمالية.',
    category: 'مشاريع',
    badge: 'جديد',
    date: '13 أبريل 2026',
    readTime: '6 دقائق',
    featured: false,
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80&auto=format',
  },
  {
    id: 6,
    title: 'تطبيق تجار المال يتجاوز 500 ألف مستخدم نشط',
    excerpt: 'حقق التطبيق الرسمي للشركة معلماً بارزاً بتجاوز نصف مليون مستخدم نشط شهرياً، مع تقييم 4.8 نجمة في متجري آبل وغوغل.',
    category: 'إعلانات',
    badge: 'جديد',
    date: '10 أبريل 2026',
    readTime: '3 دقائق',
    featured: false,
    img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80&auto=format',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Badge = ({ type }) => {
  const style = BADGE_STYLES[type];
  if (!style) return null;
  const Icon = style.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.bg}`}>
      <Icon className="w-3 h-3" />
      {type}
    </span>
  );
};

const NewsCard = ({ item, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.07 }}
    className="premium-card overflow-hidden p-0 group cursor-pointer"
  >
    {/* Lazy-loaded image */}
    <div className="relative overflow-hidden h-44">
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute top-3 right-3">
        <Badge type={item.badge} />
      </div>
    </div>

    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-md">
          {item.category}
        </span>
        <span className="text-slate-300 dark:text-slate-600">•</span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {item.date}
        </span>
      </div>

      <h3 className="font-bold dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
        {item.excerpt}
      </p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-400">{item.readTime} للقراءة</span>
        <button className="text-xs font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:gap-2 transition-all">
          اقرأ المزيد <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </motion.article>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = news.find((n) => n.featured);

  const filtered = useMemo(() =>
    news.filter((n) => {
      const matchCat = activeCategory === 'الكل' || n.category === activeCategory;
      const matchSearch =
        searchQuery === '' ||
        n.title.includes(searchQuery) ||
        n.excerpt.includes(searchQuery);
      return !n.featured && matchCat && matchSearch;
    }), [activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto pb-20 md:pb-8 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold dark:text-white">أخبار الشركة</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          آخر المستجدات والإعلانات الرسمية
        </p>
      </motion.div>

      {/* Search + Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
      >
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الأخبار..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm dark:text-white outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400 hover:text-primary-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured News */}
      {featured && activeCategory === 'الكل' && searchQuery === '' && (
        <motion.article
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="premium-card p-0 overflow-hidden cursor-pointer group"
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden h-64 md:h-auto min-h-[260px]">
              <img
                src={featured.img}
                alt={featured.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30" />
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                خبر مميز
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Badge type={featured.badge} />
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-md">
                  {featured.category}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold dark:text-white leading-snug mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {featured.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {featured.date}
                </span>
                <button className="btn-primary py-2 px-5 flex items-center gap-2 text-sm">
                  اقرأ التفاصيل <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      )}

      {/* News Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {filtered.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-slate-400"
          >
            <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">لا توجد أخبار في هذا التصنيف</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
