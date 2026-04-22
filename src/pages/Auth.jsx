import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Mail, Lock, User, ArrowRight, ShieldCheck, Phone, Loader2 } from 'lucide-react';

const Auth = () => {
  const { login, register, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
    fullName: '',
    nationalId: '',
    phoneNumber: '',
    emailOrUsername: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const credentials = {
        emailOrUsername: formData.emailOrUsername,
        password: formData.password
      };
      await login(credentials, rememberMe);
    } else {
      const userData = {
        email: formData.email,
        userName: formData.userName,
        password: formData.password,
        fullName: formData.fullName,
        nationalId: formData.nationalId,
        phoneNumber: formData.phoneNumber
      };
      const success = await register(userData);
      if (success) {
        setIsLogin(true);
      }
    }
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
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium dark:text-slate-300">الاسم بالكامل</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                        placeholder="عبدالله محمد"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium dark:text-slate-300">اسم المستخدم</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                        placeholder="user123"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium dark:text-slate-300">البريد الإلكتروني</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-slate-400" />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium dark:text-slate-300">رقم الهوية</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ShieldCheck className="w-5 h-5 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleChange}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                        placeholder="1234567890"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium dark:text-slate-300">رقم الجوال</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Phone className="w-5 h-5 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                        placeholder="05xxxxxxx"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1">
                <label className="text-sm font-medium dark:text-slate-300">البريد الإلكتروني أو اسم المستخدم</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    name="emailOrUsername"
                    value={formData.emailOrUsername}
                    onChange={handleChange}
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            )}

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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center gap-2 py-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">تذكرني</label>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
                  <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </>
              )}
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

