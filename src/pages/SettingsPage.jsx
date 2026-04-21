import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, Lock, Shield, Bell, Moon, Sun,
  Camera, Check, X, Eye, EyeOff, Save, ChevronDown,
  Smartphone, MessageSquare, FileText, AlertCircle, CheckCircle,
} from 'lucide-react';
import { useStore } from '../store/useStore';

// ─── Reusable Toggle Switch ───────────────────────────────────────────────────
const Toggle = ({ checked, onChange, id }) => (
  <button
    id={id}
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400/40 ${
      checked ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'
    }`}
  >
    <span
      className={`absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
        checked ? 'translate-x-0' : '-translate-x-5'
      }`}
    />
  </button>
);

// ─── Section Card ─────────────────────────────────────────────────────────────
const SectionCard = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="premium-card"
  >
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
      <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
      </div>
      <h3 className="font-bold dark:text-white text-base">{title}</h3>
    </div>
    {children}
  </motion.div>
);

// ─── Input Field ─────────────────────────────────────────────────────────────
const InputField = ({ label, type = 'text', value, onChange, placeholder, icon: Icon, disabled, suffix }) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full ${Icon ? 'pr-10' : 'pr-4'} ${suffix ? 'pl-16' : 'pl-4'} py-3 rounded-xl border text-sm transition-all outline-none
          ${disabled
            ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400'
          }`}
      />
      {suffix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">{suffix}</span>
      )}
    </div>
  </div>
);

// ─── Feedback Banner ──────────────────────────────────────────────────────────
const FeedbackBanner = ({ msg, type }) => {
  if (!msg) return null;
  const styles = {
    success: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300',
    error:   'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex items-center gap-2 p-3 rounded-xl border text-sm mb-4 ${styles[type]}`}
    >
      {type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
      {msg}
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { user, updateUser, darkMode, toggleDarkMode } = useStore();

  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passMsg, setPassMsg] = useState({ text: '', type: '' });

  // 2FA state
  const [twoFA, setTwoFA] = useState(user?.twoFA || false);
  const [twoFAMsg, setTwoFAMsg] = useState('');

  // Notifications state
  const [notif, setNotif] = useState(
    user?.notifications || { email: true, push: true, sms: false, weeklyReport: true }
  );

  const fileRef = useRef();

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSaveProfile = () => {
    if (!name.trim() || !email.trim()) {
      setProfileMsg({ text: 'يرجى تعبئة جميع الحقول الإلزامية', type: 'error' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProfileMsg({ text: 'البريد الإلكتروني غير صحيح', type: 'error' });
      return;
    }
    updateUser({ name, email, phone });
    setProfileMsg({ text: 'تم حفظ بيانات الملف الشخصي بنجاح ✓', type: 'success' });
    setTimeout(() => setProfileMsg({ text: '', type: '' }), 3000);
  };

  const handleChangePassword = () => {
    if (!currentPass || !newPass || !confirmPass) {
      setPassMsg({ text: 'يرجى تعبئة جميع حقول كلمة المرور', type: 'error' });
      return;
    }
    if (newPass.length < 8) {
      setPassMsg({ text: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل', type: 'error' });
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg({ text: 'كلمات المرور غير متطابقة', type: 'error' });
      return;
    }
    setPassMsg({ text: 'تم تغيير كلمة المرور بنجاح ✓', type: 'success' });
    setCurrentPass(''); setNewPass(''); setConfirmPass('');
    setTimeout(() => setPassMsg({ text: '', type: '' }), 3000);
  };

  const handleToggle2FA = () => {
    const next = !twoFA;
    setTwoFA(next);
    updateUser({ twoFA: next });
    setTwoFAMsg(next ? 'تم تفعيل المصادقة الثنائية بنجاح ✓' : 'تم تعطيل المصادقة الثنائية');
    setTimeout(() => setTwoFAMsg(''), 3000);
  };

  const handleSaveNotifications = () => {
    updateUser({ notifications: notif });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateUser({ avatar: url });
  };

  const passwordStrength = () => {
    if (!newPass) return null;
    if (newPass.length < 6) return { label: 'ضعيفة', color: 'bg-red-400', width: 'w-1/4' };
    if (newPass.length < 8) return { label: 'متوسطة', color: 'bg-amber-400', width: 'w-2/4' };
    if (/[A-Z]/.test(newPass) && /[0-9]/.test(newPass)) return { label: 'قوية جداً', color: 'bg-emerald-500', width: 'w-full' };
    return { label: 'جيدة', color: 'bg-blue-400', width: 'w-3/4' };
  };
  const strength = passwordStrength();

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-8 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold dark:text-white">الإعدادات</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          إدارة حسابك وتفضيلاتك الشخصية
        </p>
      </motion.div>

      {/* ── Profile Settings ── */}
      <SectionCard title="الملف الشخصي" icon={User} delay={0.1}>
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-lg"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -left-1 w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div>
            <p className="font-bold dark:text-white">{user?.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.role}</p>
            <button
              onClick={() => fileRef.current?.click()}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-1 block"
            >
              تغيير الصورة
            </button>
          </div>
        </div>

        <AnimatePresence>
          {profileMsg.text && <FeedbackBanner msg={profileMsg.text} type={profileMsg.type} />}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <InputField label="الاسم الكامل *" value={name} onChange={(e) => setName(e.target.value)} placeholder="الاسم الكامل" icon={User} />
          <InputField label="البريد الإلكتروني *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" icon={Mail} />
          <InputField label="رقم الجوال" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+966 5X XXX XXXX" icon={Phone} />
          <InputField label="نوع الحساب" value={user?.role || ''} disabled icon={Shield} />
        </div>

        <button onClick={handleSaveProfile} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> حفظ التغييرات
        </button>
      </SectionCard>

      {/* ── Security ── */}
      <SectionCard title="الأمان وكلمة المرور" icon={Lock} delay={0.15}>
        <AnimatePresence>
          {passMsg.text && <FeedbackBanner msg={passMsg.text} type={passMsg.type} />}
        </AnimatePresence>

        <div className="space-y-4 mb-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">كلمة المرور الحالية</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-10 pl-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm dark:text-white outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all"
              />
              <button onClick={() => setShowCurrent(!showCurrent)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">كلمة المرور الجديدة</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-10 pl-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm dark:text-white outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all"
              />
              <button onClick={() => setShowNew(!showNew)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Strength Bar */}
            {strength && (
              <div className="mt-2">
                <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: strength.width.replace('w-', '') === 'full' ? '100%' : strength.width.replace('w-', '').replace('/', '/') }}
                    className={`h-full rounded-full ${strength.color} transition-all`}
                    style={{ width: strength.width === 'w-full' ? '100%' : strength.width === 'w-3/4' ? '75%' : strength.width === 'w-2/4' ? '50%' : '25%' }}
                  />
                </div>
                <p className={`text-xs mt-1 font-medium ${strength.color.replace('bg-', 'text-').replace('-400', '-600').replace('-500', '-600')}`}>
                  قوة كلمة المرور: {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">تأكيد كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="••••••••"
                className={`w-full pr-10 pl-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all dark:bg-slate-900 dark:text-white ${
                  confirmPass && confirmPass !== newPass
                    ? 'border-red-400 focus:ring-red-400/20 bg-red-50 dark:bg-red-900/10'
                    : 'border-slate-200 dark:border-slate-700 bg-white focus:ring-primary-400/30 focus:border-primary-400'
                }`}
              />
              {confirmPass && confirmPass === newPass && (
                <Check className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              )}
            </div>
          </div>
        </div>

        <button onClick={handleChangePassword} className="btn-primary flex items-center gap-2">
          <Shield className="w-4 h-4" /> تغيير كلمة المرور
        </button>

        {/* 2FA */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold dark:text-white text-sm">المصادقة الثنائية (2FA)</p>
              <p className="text-xs text-slate-400 mt-0.5">حماية إضافية لحسابك عبر رمز يُرسل لجوالك</p>
            </div>
            <Toggle checked={twoFA} onChange={handleToggle2FA} id="toggle-2fa" />
          </div>
          <AnimatePresence>
            {twoFAMsg && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3" /> {twoFAMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </SectionCard>

      {/* ── Theme Settings ── */}
      <SectionCard title="المظهر والثيم" icon={darkMode ? Moon : Sun} delay={0.2}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              darkMode ? 'bg-slate-800 text-slate-200' : 'bg-amber-50 text-amber-500'
            }`}>
              {darkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </div>
            <div>
              <p className="font-semibold dark:text-white">{darkMode ? 'الوضع المظلم' : 'الوضع الفاتح'}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {darkMode ? 'مريح للعينين في بيئات الإضاءة المنخفضة' : 'واجهة مشرقة للاستخدام النهاري'}
              </p>
            </div>
          </div>
          <Toggle checked={darkMode} onChange={toggleDarkMode} id="toggle-darkmode" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => { if (darkMode) toggleDarkMode(); }}
            className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${
              !darkMode
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary-400'
            }`}
          >
            <Sun className="w-5 h-5 mx-auto mb-1" />
            فاتح
          </button>
          <button
            onClick={() => { if (!darkMode) toggleDarkMode(); }}
            className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${
              darkMode
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary-400'
            }`}
          >
            <Moon className="w-5 h-5 mx-auto mb-1" />
            مظلم
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-3">يتم حفظ تفضيل الثيم تلقائياً في المتصفح.</p>
      </SectionCard>

      {/* ── Notifications ── */}
      <SectionCard title="الإشعارات" icon={Bell} delay={0.25}>
        <div className="space-y-4">
          {[
            { key: 'email',        label: 'إشعارات البريد الإلكتروني', desc: 'استلام التنبيهات عبر الإيميل', icon: Mail },
            { key: 'push',         label: 'إشعارات الدفع',            desc: 'تنبيهات فورية في المتصفح',    icon: Bell },
            { key: 'sms',          label: 'الرسائل النصية (SMS)',       desc: 'تنبيهات عبر رسائل الجوال',   icon: MessageSquare },
            { key: 'weeklyReport', label: 'التقرير الأسبوعي',          desc: 'ملخص أداء محفظتك أسبوعياً', icon: FileText },
          ].map(({ key, label, desc, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </div>
              <Toggle
                checked={notif[key]}
                onChange={(val) => setNotif((prev) => ({ ...prev, [key]: val }))}
                id={`toggle-${key}`}
              />
            </div>
          ))}
        </div>

        <button onClick={handleSaveNotifications} className="btn-primary mt-5 flex items-center gap-2">
          <Save className="w-4 h-4" /> حفظ إعدادات الإشعارات
        </button>
      </SectionCard>
    </div>
  );
}
