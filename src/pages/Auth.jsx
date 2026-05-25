import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Phone, Loader2 } from 'lucide-react';

const LOGO_SRC = '/logo.png';

const PARTNERS = [
  {
    name: 'هيئة السوق المالية',
    href: 'https://cma.org.sa',
    logo: '/partners/cma.png',
  },
  {
    name: 'وزارة الاستثمار',
    href: 'https://misa.gov.sa',
    logo: '/partners/misa.png',
  },
  {
    name: 'البنك المركزي السعودي',
    href: 'https://www.sama.gov.sa',
    logo: '/partners/sama.png',
  },
];

const Auth = () => {
  const { login, register, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

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

  const inputClass =
    'w-full bg-white/90 border border-primary-200 rounded-xl py-3 pr-10 pl-4 ' +
    'focus:outline-none focus:ring-2 focus:ring-gold-300/40 focus:border-gold-400 ' +
    'text-primary-900 placeholder:text-primary-400/70 transition-all';

  return (
    <div className="min-h-screen flex bg-primary-50 bg-mesh transition-colors duration-300">

      {/* Brand panel — right side (RTL) */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-black rounded-l-[3rem]">
        <div className="absolute inset-0 bg-auth-mesh opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

        <div className="relative z-10 flex flex-col justify-between items-center p-8 xl:p-12 w-full text-center min-h-0 flex-1">
          <motion.img
            src={LOGO_SRC}
            alt="تجار المال"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-36 xl:w-44 h-auto object-contain drop-shadow-glow-gold flex-shrink-0"
          />

          <div className="max-w-xl px-2 py-6 overflow-y-auto flex-1 min-h-0">
            <h2 className="font-serif text-3xl xl:text-4xl font-bold text-gold-300 mb-5 leading-tight">
              استثمر بذكاء، <br /> ونمِّ ثروتك بأمان.
            </h2>
            <div className="space-y-4 text-gold-100/85 text-[13px] lg:text-sm xl:text-[15px] leading-[1.9] text-justify">
              <p>
                تمكّن المنصة عملائها من تداول أسهم الشركة في بيئة موحدة تتسم بالأمان العالي والسرعة في إنجاز العمليات، حيث توفر رؤية متكاملة وقوائم سوقية تفاعلية للأسهم، بما يعزز ثقة المستثمرين ويضمن وضوح التعاملات.
              </p>
              <p>
                كما تمنح المساهمين رؤية شاملة ودقيقة حول أرباح الشركات ومشاريعها وخططها المستقبلية، عبر منظومة رقمية متطورة تُمكّن المستثمر من الاطلاع على القيمة الحقيقية لاستثماراته واتخاذ قراراته بثقة واطمئنان، حسب الأنظمة بالمملكة العربية السعودية.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gold-400/25">
              <p className="text-gold-300 text-sm font-semibold mb-4">شركاء المشروع</p>
              <div className="flex flex-wrap items-stretch justify-center gap-3">
                {PARTNERS.map((partner) => (
                  <a
                    key={partner.href}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={partner.name}
                    className="flex items-center justify-center bg-white rounded-xl px-4 py-3 h-[4.5rem] min-w-[6.5rem] max-w-[8.5rem] flex-1 hover:ring-2 hover:ring-gold-400/50 hover:shadow-lg transition-all duration-200"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-11 w-full object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-gold-200/80 text-sm">
            <span>© 2024 تجار المال للاستثمار</span>
            <span className="w-1 h-1 rounded-full bg-gold-400/60" />
            <span>مرخص من هيئة السوق المالية</span>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-24 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img
              src={LOGO_SRC}
              alt="تجار المال"
              className="w-32 h-auto object-contain"
            />
          </div>

          <div className="mb-8 text-center lg:text-right">
            <h2 className="font-serif text-3xl font-bold text-primary-800 mb-2">
              {isLogin ? 'مرحباً بعودتك' : 'إنشاء حساب جديد'}
            </h2>
            <p className="text-primary-600/80">
              {isLogin ? 'قم بتسجيل الدخول للوصول إلى محفظتك' : 'انضم إلينا وابدأ رحلة الاستثمار'}
            </p>
          </div>

          <div className="rounded-3xl border border-primary-200/80 bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-primary-500/10">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-primary-800">الاسم بالكامل</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <User className="w-5 h-5 text-primary-400" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="عبدالله محمد"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-primary-800">اسم المستخدم</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <User className="w-5 h-5 text-primary-400" />
                        </div>
                        <input
                          type="text"
                          name="userName"
                          value={formData.userName}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="user123"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-primary-800">البريد الإلكتروني</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Mail className="w-5 h-5 text-primary-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-primary-800">رقم الهوية</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ShieldCheck className="w-5 h-5 text-primary-400" />
                        </div>
                        <input
                          type="text"
                          name="nationalId"
                          value={formData.nationalId}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="1234567890"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-primary-800">رقم الجوال</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Phone className="w-5 h-5 text-primary-400" />
                        </div>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="05xxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-primary-800">البريد الإلكتروني أو اسم المستخدم</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-primary-400" />
                    </div>
                    <input
                      type="text"
                      name="emailOrUsername"
                      value={formData.emailOrUsername}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-primary-800">كلمة المرور</label>
                  {isLogin && (
                    <button type="button" className="text-xs text-gold-600 hover:text-gold-500 font-medium hover:underline">
                      نسيت كلمة المرور؟
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-primary-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={inputClass}
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
                    className="w-4 h-4 rounded border-primary-300 text-primary-600 focus:ring-gold-400"
                  />
                  <label htmlFor="remember" className="text-sm text-primary-700 cursor-pointer">تذكرني</label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-4 mt-2 flex items-center justify-center gap-2 group disabled:opacity-70"
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
          </div>

          <p className="mt-8 text-center text-primary-600 text-sm">
            {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-700 font-bold hover:text-gold-600 hover:underline transition-colors"
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
