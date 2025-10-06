import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import { depositModalReducer, addAccountModalReducer } from './modalSlice';

export const store = configureStore({
  reducer: {
    accounts: accountReducer,
    depositModal: depositModalReducer,
    addAccountModal: addAccountModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
