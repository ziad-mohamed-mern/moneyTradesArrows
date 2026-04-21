import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FolderKanban, Newspaper, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { projectsService, newsService } from '../../services/api';

export default function AdminDashboard() {
  const { data: projectsData, isLoading: loadingProjects, error: errProjects } = useQuery({
    queryKey: ['projects', 1],
    queryFn: () => projectsService.getAll(1, 1).then(r => r.data)
  });

  const { data: newsData, isLoading: loadingNews, error: errNews } = useQuery({
    queryKey: ['news', 1],
    queryFn: () => newsService.getAll(1, 1).then(r => r.data)
  });

  const projectsCount = projectsData?.totalCount ?? projectsData?.data?.length ?? projectsData?.items?.length ?? 0;
  const newsCount = newsData?.totalCount ?? newsData?.data?.length ?? newsData?.items?.length ?? 0;

  const stats = [
    {
      title: 'إجمالي المشاريع',
      value: loadingProjects ? '...' : projectsCount,
      icon: FolderKanban,
      color: 'blue'
    },
    {
      title: 'إجمالي الأخبار',
      value: loadingNews ? '...' : newsCount,
      icon: Newspaper,
      color: 'amber'
    },
    {
      title: 'المستخدمين النشطين',
      value: '+150',
      icon: Users,
      color: 'emerald'
    },
    {
      title: 'الزيارات اليومية',
      value: '2.4K',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {(errProjects || errNews) && (
         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 text-red-600 dark:text-red-300 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            فشل في تحميل بعض الإحصائيات. يرجى التحقق من اتصال الخادم.
         </div>
      )}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Placeholder for future charts or activity logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-sm min-h-[400px] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-white mb-2">مساحة للإحصائيات المتقدمة</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">يمكن إضافة رسوم بيانية ومؤشرات أداء هنا مستقبلاً.</p>
        </div>
      </motion.div>
    </div>
  );
}
