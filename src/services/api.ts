import type { TradingAccount } from '../types/account';

// Моковые данные для демонстрации
const mockAccounts: TradingAccount[] = [
  {
    type: 'StandardTradingAccount',
    id: '4354353',
    active: true,
    demo: true,
    equity: 1500,
    leverage: 50,
    data: [
      { timestamp: 1640995200000, value: 1400 },
      { timestamp: 1641081600000, value: 1450 },
      { timestamp: 1641168000000, value: 1500 },
    ],
  },
  {
    type: 'StandardTradingAccount',
    id: '3455256156',
    active: true,
    demo: false,
    equity: 340,
    leverage: 100,
    data: [
      { timestamp: 1640995200000, value: 320 },
      { timestamp: 1641081600000, value: 330 },
      { timestamp: 1641168000000, value: 340 },
    ],
  },
  {
    type: 'StandardTradingAccount',
    id: '546354535345',
    active: true,
    demo: false,
    equity: 690,
    leverage: 20,
    data: [
      { timestamp: 1640995200000, value: 650 },
      { timestamp: 1641081600000, value: 670 },
      { timestamp: 1641168000000, value: 690 },
    ],
  },
  {
    type: 'AppTradingAccount',
    id: 'app-001',
    balance: 450,
  },
  {
    type: 'StandardTradingAccount',
    id: '6876248762',
    active: false,
    demo: false,
    equity: 0,
    leverage: 0,
    data: [],
  },
];

export const fetchAccounts = async (): Promise<TradingAccount[]> => {
  try {
    // В реальном приложении здесь будет запрос к API
    // const response = await api.get('/accounts');
    // return response.data;

    // Для демонстрации возвращаем моковые данные
    await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация загрузки
    return mockAccounts;
  } catch (error) {
    console.error('Ошибка загрузки счетов:', error);
    throw error;
  }
};

export const depositToAccount = async (
  accountId: string,
  amount: number
): Promise<void> => {
  try {
    // В реальном приложении здесь будет запрос к API
    // await api.post(`/accounts/${accountId}/deposit`, { amount });
    console.log(`Депозит ${amount} на счет ${accountId}`);
  } catch (error) {
    console.error('Ошибка депозита:', error);
    throw error;
  }
};

export const reactivateAccount = async (accountId: string): Promise<void> => {
  try {
    // В реальном приложении здесь будет запрос к API
    // await api.post(`/accounts/${accountId}/reactivate`);
    console.log(`Реактивация счета ${accountId}`);
  } catch (error) {
    console.error('Ошибка реактивации счета:', error);
    throw error;
  }
};
