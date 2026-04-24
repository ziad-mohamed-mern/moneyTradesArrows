import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4" dir="rtl">
      <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      <p className="text-slate-500 font-medium animate-pulse">جاري تحميل الأخبار...</p>
    </div>
  );
}
