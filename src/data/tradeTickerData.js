const STOCK_NAMES = {
  SHMK: 'الشمكة المالية',
  ARAMCO: 'أرامكو السعودية',
  STC: 'الاتصالات السعودية',
  SABIC: 'سابك',
  RIYAD: 'بنك الرياض',
};

const INVESTORS = [
  'محمد القحطاني',
  'أحمد الشمري',
  'خالد العتيبي',
  'فهد الدوسري',
  'سارة الحربي',
  'نورة الزهراني',
  'عبدالله المطيري',
  'ريم السبيعي',
];

/** @returns {string} */
export function formatTradeTickerMessage({ type, seller, buyer, qty, stock }) {
  const company = STOCK_NAMES[stock] || stock;
  const q = qty.toLocaleString('ar-SA');

  if (type === 'بيع' || type === 'sell') {
    return `باع السيد ${seller} عدد ${q} من اسهم ${company} الى السيد ${buyer}`;
  }
  return `اشترى السيد ${buyer} عدد ${q} من اسهم ${company} من السيد ${seller}`;
}

export function createTickerFromOrder(order, currentUserName = 'المستثمر') {
  const counterpart = INVESTORS[Math.floor(Math.random() * INVESTORS.length)];
  const isSell = order.type === 'بيع';
  const seller = isSell ? currentUserName : counterpart;
  const buyer = isSell ? counterpart : currentUserName;

  return {
    id: `order-${order.id}-${Date.now()}`,
    type: order.type,
    seller,
    buyer,
    qty: order.qty,
    stock: order.stock,
    message: formatTradeTickerMessage({
      type: order.type,
      seller,
      buyer,
      qty: order.qty,
      stock: order.stock,
    }),
  };
}

export const INITIAL_TRADE_TICKER = [
  {
    id: 1,
    message: formatTradeTickerMessage({
      type: 'بيع',
      seller: 'محمد القحطاني',
      buyer: 'أحمد الشمري',
      qty: 1000,
      stock: 'SHMK',
    }),
  },
  {
    id: 2,
    message: formatTradeTickerMessage({
      type: 'شراء',
      seller: 'خالد العتيبي',
      buyer: 'فهد الدوسري',
      qty: 500,
      stock: 'ARAMCO',
    }),
  },
  {
    id: 3,
    message: formatTradeTickerMessage({
      type: 'بيع',
      seller: 'سارة الحربي',
      buyer: 'نورة الزهراني',
      qty: 250,
      stock: 'STC',
    }),
  },
  {
    id: 4,
    message: formatTradeTickerMessage({
      type: 'شراء',
      seller: 'عبدالله المطيري',
      buyer: 'ريم السبيعي',
      qty: 750,
      stock: 'SABIC',
    }),
  },
  {
    id: 5,
    message: formatTradeTickerMessage({
      type: 'بيع',
      seller: 'أحمد الشمري',
      buyer: 'محمد القحطاني',
      qty: 120,
      stock: 'RIYAD',
    }),
  },
];
