import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

const TradeTicker = () => {
  const { tradeTicker } = useStore();
  const items = tradeTicker.length > 0 ? tradeTicker : [];

  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <div
      className="flex flex-1 max-w-xl mx-2 md:mx-4 lg:mx-8 overflow-hidden rounded-lg bg-black border border-slate-800 py-2 md:py-2.5 relative"
      aria-label="شريط البيع والشراء"
    >
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 5 * 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {loop.map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className="text-sm md:text-[15px] font-semibold text-red-500 shrink-0 px-2"
          >
            {item.message}
          </span>
        ))}
      </motion.div>

      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default TradeTicker;
