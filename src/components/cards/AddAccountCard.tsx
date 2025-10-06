import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openAddAccountModal } from '../../store/modalSlice';
import type { RootState } from '../../store';
import { Plus, AlertTriangle, Wallet, Smartphone } from 'lucide-react';

const AddAccountCard: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  
  // Подсчитываем количество активных счетов (только StandardTradingAccount)
  const activeAccountsCount = accounts.filter(account => 
    account.type === 'StandardTradingAccount' && account.active
  ).length;

  const canAddAccount = activeAccountsCount < 5;

  const handleAddAccount = () => {
    if (canAddAccount) {
      dispatch(openAddAccountModal());
    }
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed transition-all duration-200 ${
      canAddAccount 
        ? 'border-blue-300 hover:border-blue-400 hover:shadow-md' 
        : 'border-gray-300'
    }`}>
      <button
        onClick={handleAddAccount}
        disabled={!canAddAccount}
        className={`w-full h-40 flex flex-col items-center justify-center p-4 ${
          canAddAccount 
            ? 'hover:from-blue-100 hover:to-indigo-100 cursor-pointer' 
            : 'cursor-not-allowed opacity-50'
        }`}
      >
        {canAddAccount ? (
          <>
            <div className="flex items-center space-x-2 mb-3">
              <Plus className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">Добавить счет</span>
            </div>
            
            <div className="flex justify-center mb-3">
              <div className="flex flex-col items-center space-y-1">
                <Wallet className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Standard Account</span>
              </div>
            </div>
            
            <span className="text-xs text-gray-500 text-center">
              Доступно: {5 - activeAccountsCount} из 5 счетов
            </span>
          </>
        ) : (
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 text-gray-400 mb-3 mx-auto" />
            <div className="text-sm font-medium text-gray-600 mb-2">
              Лимит счетов достигнут
            </div>
            <span className="text-xs text-gray-500">
              Максимум 5 активных счетов. Деактивируйте существующие для добавления новых.
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AddAccountCard;
