import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DepositModalState, AddAccountModalState } from '../types/modal';

const initialDepositModalState: DepositModalState = {
  isOpen: false,
  accountId: null,
};

const initialAddAccountModalState: AddAccountModalState = {
  isOpen: false,
};

const depositModalSlice = createSlice({
  name: 'depositModal',
  initialState: initialDepositModalState,
  reducers: {
    openDepositModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.accountId = action.payload;
    },
    closeDepositModal: (state) => {
      state.isOpen = false;
      state.accountId = null;
    },
  },
});

const addAccountModalSlice = createSlice({
  name: 'addAccountModal',
  initialState: initialAddAccountModalState,
  reducers: {
    openAddAccountModal: (state) => {
      state.isOpen = true;
    },
    closeAddAccountModal: (state) => {
      state.isOpen = false;
    },
  },
});

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: { isOpen: false },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
  },
});

export const { openDepositModal, closeDepositModal } = depositModalSlice.actions;
export const { openAddAccountModal, closeAddAccountModal } = addAccountModalSlice.actions;
export const { toggleSidebar, closeSidebar, openSidebar } = sidebarSlice.actions;

export const depositModalReducer = depositModalSlice.reducer;
export const addAccountModalReducer = addAccountModalSlice.reducer;
export const sidebarReducer = sidebarSlice.reducer;
