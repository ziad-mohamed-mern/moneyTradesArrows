'use client';

import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Page Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-4" dir="rtl">
      <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold dark:text-white">عذراً، حدث خطأ ما</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          لم نتمكن من تحميل الأخبار في الوقت الحالي. يرجى التحقق من اتصالك بالإنترنت أو المحاولة مرة أخرى.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all active:scale-95 shadow-lg shadow-primary-500/30"
      >
        <RefreshCcw className="w-5 h-5" /> إعادة المحاولة
      </button>
    </div>
  );
}
