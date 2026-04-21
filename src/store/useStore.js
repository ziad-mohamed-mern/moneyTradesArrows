import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Auth
      isAuthenticated: true,
      user: {
        name: 'أحمد القحطاني',
        email: 'ahmed@tajar.sa',
        phone: '+966 50 123 4567',
        avatar: 'https://i.pravatar.cc/150?u=ahmed',
        balance: 125430.5,
        currency: 'ر.س',
        role: 'عضو بلاتيني',
        twoFA: false,
        notifications: {
          email: true,
          push: true,
          sms: false,
          weeklyReport: true,
        },
      },
      updateUser: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Active Page
      activePage: 'trading',
      setActivePage: (page) => set({ activePage: page }),

      // Trading
      selectedTimeframe: '1W',
      setSelectedTimeframe: (tf) => set({ selectedTimeframe: tf }),
      tradeType: 'buy', // 'buy' | 'sell'
      setTradeType: (type) => set({ tradeType: type }),

      // Orders history stored in state
      orders: [
        {
          id: 1,
          type: 'شراء',
          stock: 'SHMK',
          qty: 150,
          price: 24.5,
          total: 3675,
          date: '2026-04-20',
          status: 'مكتمل',
        },
        {
          id: 2,
          type: 'بيع',
          stock: 'SHMK',
          qty: 50,
          price: 25.1,
          total: 1255,
          date: '2026-04-19',
          status: 'مكتمل',
        },
        {
          id: 3,
          type: 'شراء',
          stock: 'ARAMCO',
          qty: 30,
          price: 28.8,
          total: 864,
          date: '2026-04-18',
          status: 'قيد التنفيذ',
        },
        {
          id: 4,
          type: 'شراء',
          stock: 'STC',
          qty: 80,
          price: 45.2,
          total: 3616,
          date: '2026-04-17',
          status: 'مكتمل',
        },
        {
          id: 5,
          type: 'بيع',
          stock: 'SABIC',
          qty: 200,
          price: 92.4,
          total: 18480,
          date: '2026-04-16',
          status: 'مكتمل',
        },
      ],
      addOrder: (order) =>
        set((state) => ({
          orders: [
            { ...order, id: state.orders.length + 1, date: new Date().toISOString().split('T')[0] },
            ...state.orders,
          ],
        })),
    }),
    {
      name: 'investment-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        user: state.user,
        orders: state.orders,
      }),
    }
  )
);
