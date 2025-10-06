export interface AppTradingAccount {
  type: 'AppTradingAccount';
  id: string;
  balance: number;
}

export interface StandardTradingAccount {
  type: 'StandardTradingAccount';
  id: string;
  active: boolean;
  demo: boolean;
  equity: number;
  leverage: number;
  data: Array<{
    timestamp: number;
    value: number;
  }>;
}

export type TradingAccount = AppTradingAccount | StandardTradingAccount;

export interface AccountState {
  accounts: TradingAccount[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  accounts: AccountState;
}
