import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loadAccounts } from '../store/accountSlice';
import type { RootState } from '../store';
import { useAppDispatch } from '../store';
import {
  StandardTradingAccountCard,
  AppTradingAccountCard,
  AddAccountCard,
} from '../components/cards';
import { DepositModal, AddAccountModal } from '../components/modals';
import { AccountCardSkeleton } from '../components/common';
import { AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { accounts, loading, error } = useSelector(
    (state: RootState) => state.accounts
  );

  useEffect(() => {
    dispatch(loadAccounts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('navigation.dashboard')}
          </h1>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <AccountCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(loadAccounts())}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('common.tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('navigation.dashboard')}
        </h1>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(account => (
          <div key={account.id}>
            {account.type === 'StandardTradingAccount' ? (
              <StandardTradingAccountCard account={account} />
            ) : (
              <AppTradingAccountCard account={account} />
            )}
          </div>
        ))}

        {/* Add Account Card */}
        <AddAccountCard />
      </div>

      {/* Modals */}
      <DepositModal />
      <AddAccountModal />
    </div>
  );
};

export default Dashboard;
