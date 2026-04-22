import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import authService from '../../services/authService';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const { setAuth } = useAdminStore();
  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.emailOrUsername || !form.password) {
      setError('يرجى تعبئة جميع الحقول');
      return;
    }
    setLoading(true);
    try {
      // Mock Login as requested by user (UI Only)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const token = 'mock_jwt_token_12345';
      const user = { fullName: form.emailOrUsername, email: form.emailOrUsername };
      
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(user));
      setAuth(token, user);
      toast.success('تم تسجيل الدخول بنجاح (وضع العرض)');
      
    } catch (err) {
      setError('بيانات الدخول غير صحيحة');
      toast.error('بيانات الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
            <p className="text-slate-400 text-sm mt-1">تسجيل دخول المشرف</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/15 border border-red-500/30 text-red-300 text-sm p-3 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            {/* Email/Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">البريد أو اسم المستخدم</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={form.emailOrUsername}
                  onChange={(e) => setForm({ ...form, emailOrUsername: e.target.value })}
                  placeholder="admin@example.com"
                  className="w-full bg-white/[0.07] border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-slate-500 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.07] border border-white/10 rounded-xl py-3 pr-10 pl-10 text-white placeholder:text-slate-500 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="text-center text-slate-600 text-xs mt-6">
            ArrowsPlatform Admin · v2.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}
