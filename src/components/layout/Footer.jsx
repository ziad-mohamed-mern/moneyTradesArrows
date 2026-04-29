import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto pt-8 pb-4 text-center border-t border-slate-200 dark:border-slate-800">
      <div className="flex justify-center mb-6">
        <a 
          href="https://money-trades.vercel.app/" 
          className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
        >
          العوده لتجار المال
        </a>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} جميع الحقوق محفوظة لتجار المال للاستثمار.
      </p>
    </footer>
  );
};

export default Footer;
