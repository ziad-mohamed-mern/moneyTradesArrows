import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Newspaper } from 'lucide-react';

const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2rem] p-8 md:p-12 mb-8"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-primary-600 shadow-2xl shadow-primary-500/40" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-right">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm mb-6 border border-white/10"
          >
            <TrendingUp className="w-4 h-4 text-emerald-300" />
            <span>نظام التداول الجديد متاح الآن</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            مستقبلك المالي يبدأ <br /> مع تجار المال للاستثمار
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto md:mx-0 text-lg">
            منصة متكاملة لإدارة استثماراتك في السوق المالي السعودي بذكاء واحترافية. استثمر، داول، وحقق أرباحك بكل سهولة.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button className="px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 group shadow-xl">
              ابدأ التداول الآن
              <ArrowRight className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
              <Newspaper className="w-5 h-5" />
              أحدث الأخبار
            </button>
          </div>
        </div>

        <div className="hidden lg:block flex-1 max-w-sm">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative"
          >
            <div className="glass p-6 rounded-[2rem] border-white/20">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">ST</div>
                    <div>
                      <p className="text-white font-bold">سابك</p>
                      <p className="text-white/60 text-xs">2010.SR</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold">104.20 ر.س</p>
                    <p className="text-emerald-400 text-xs font-bold font-mono">+2.45%</p>
                  </div>
               </div>
               <div className="h-20 w-full flex items-end gap-1">
                  {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-white/20 rounded-t-sm" 
                      style={{ height: `${h}%` }} 
                    />
                  ))}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
