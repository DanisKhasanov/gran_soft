import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { TradingAccount, AccountState, StandardTradingAccount, AppTradingAccount } from '../types/account';
import { fetchAccounts } from '../services/api';

const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
};

export const loadAccounts = createAsyncThunk(
  'accounts/loadAccounts',
  async () => {
    const response = await fetchAccounts();
    return response;
  }
);

export const addAccount = createAsyncThunk(
  'accounts/addAccount',
  async (accountType: 'StandardTradingAccount' | 'AppTradingAccount') => {
   
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAccount: TradingAccount = accountType === 'StandardTradingAccount' 
      ? {
          type: 'StandardTradingAccount',
          id: `ACC-${Date.now()}`,
          active: true,
          demo: false,
          equity: 1000,
          leverage: 100,
          data: []
        } as StandardTradingAccount
      : {
          type: 'AppTradingAccount',
          id: `APP-${Date.now()}`,
          balance: 1000
        } as AppTradingAccount;
    
    return newAccount;
  }
);

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAccounts.fulfilled, (state, action: PayloadAction<TradingAccount[]>) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(loadAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки счетов';
      })
      .addCase(addAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAccount.fulfilled, (state, action: PayloadAction<TradingAccount>) => {
        state.loading = false;
        state.accounts.push(action.payload);
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка создания счета';
      });
  },
});

export const { clearError } = accountSlice.actions;
export default accountSlice.reducer;
