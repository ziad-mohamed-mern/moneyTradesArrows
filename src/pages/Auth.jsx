import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth = () => {
  const { login } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }

    // Mock Authentication
    login({
      name: isLogin ? 'أحمد القحطاني' : name,
      email: email,
      avatar: 'https://i.pravatar.cc/150?u=demo',
      balance: 150000,
      currency: 'ر.س'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex bg-mesh transition-colors duration-300">
      
      {/* Visual Side */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-primary-900 rounded-l-[3rem]">
        <div className="absolute inset-0 bg-mesh opacity-50 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-950/80" />
        
        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <TrendingUp className="text-primary-600 w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-white">تجار المال</h1>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              استثمر بذكاء، <br /> ونمِّ ثروتك بأمان.
            </h2>
            <p className="text-primary-200 text-lg max-w-md">
              المنصة الأسرع والأكثر أماناً لتداول الأسهم وإدارة المحافظ الاستثمارية في المملكة.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-primary-300 text-sm">
            <span>© 2024 تجار المال للاستثمار</span>
            <span className="w-1 h-1 rounded-full bg-primary-500" />
            <span>مرخص من هيئة السوق المالية</span>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-10 text-center lg:text-right">
            <h2 className="text-3xl font-bold dark:text-white mb-2">
              {isLogin ? 'مرحباً بعودتك 👋' : 'إنشاء حساب جديد'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {isLogin ? 'قم بتسجيل الدخول للوصول إلى محفظتك' : 'انضم إلينا وابدأ رحلة الاستثمار'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode='wait'>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm border border-rose-100"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium dark:text-slate-300">الاسم الكامل</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                    placeholder="عبدالله محمد"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium dark:text-slate-300">البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium dark:text-slate-300">كلمة المرور</label>
                {isLogin && (
                  <button type="button" className="text-xs text-primary-600 hover:underline">
                    نسيت كلمة المرور؟
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary py-4 mt-8 flex items-center justify-center gap-2 group">
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
              <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary-600 font-bold hover:underline"
            >
              {isLogin ? 'سجل الآن' : 'تسجيل الدخول'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
