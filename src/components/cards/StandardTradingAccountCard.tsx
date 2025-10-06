import React, { useState } from 'react';
import type { StandardTradingAccount } from '../../types/account';
import { useDispatch } from 'react-redux';
import { openDepositModal } from '../../store/modalSlice';
import { X, Wallet, Power } from 'lucide-react';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';
import { MiniChart } from '../common';

interface StandardTradingAccountCardProps {
  account: StandardTradingAccount;
}

const StandardTradingAccountCard: React.FC<StandardTradingAccountCardProps> = ({ account }) => {
  const dispatch = useDispatch();
  const [isReactivationInProgress, setIsReactivationInProgress] = useState(false);
  const { showSnackbar } = useCustomSnackbar();

  const handleDeposit = () => {
    dispatch(openDepositModal(account.id));
  };

  const handleToggleReactivation = async () => {
    setIsReactivationInProgress(true);
    
    try {
      // Имитация процесса реактивации
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Здесь будет реальная логика реактивации счета
      console.log('Реактивация счета:', account.id);
      
      // Показываем уведомление об успешной реактивации
      showSnackbar(`Счет ${account.id} успешно реактивирован`, {
        variant: 'success',
        autoHideDuration: 3000,
      });
      
      // После успешной реактивации можно обновить состояние
      // dispatch(reactivateAccount(account.id));
      
    } catch (error) {
      console.error('Ошибка при реактивации счета:', error);
      // Показываем уведомление об ошибке
      showSnackbar('Ошибка реактивации счета', {
        variant: 'error',
        autoHideDuration: 4000,
      });
    } finally {
      setIsReactivationInProgress(false);
    }
  };

  const getCurrencySymbol = (accountId: string) => {
    // Простая логика определения валюты по ID
    return accountId.includes('EUR') ? 'EUR' : 'USD';
  };

  const currency = getCurrencySymbol(account.id);
  const isActive = account.active;
  const isDemo = account.demo;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`px-4 py-3 ${isActive ? 'bg-blue-100' : 'bg-purple-100'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {!isActive && (
              <X className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium text-gray-800">
              {isDemo ? `DEMO - ${account.id}` : account.id}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-600">{currency}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {isActive ? (
          <>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                equity - {account.equity}{currency.toLowerCase()}
              </div>
              <div className="text-sm text-gray-600">
                leverage - 1:{account.leverage}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              {!isDemo && (
                <button
                  onClick={handleDeposit}
                  className="group flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Wallet className="w-10 h-10 group-hover:scale-110 transition-transform duration-200" />
                  <span className="tracking-wide">Депозит</span>
                </button>
              )}
              
              {/* Мини-график */}
              <MiniChart 
                data={[20, 25, 20, 17, 15, 10, 20, 25, 20, 17, 15, 10]}
                trend="up"
                size="lg"
              />
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-4">Счет деактивирован</div>
              
              {/* Toggle для реактивации */}
              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-xs text-gray-500">Реактивировать</span>
                <button
                  onClick={handleToggleReactivation}
                  disabled={isReactivationInProgress}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isReactivationInProgress 
                      ? 'bg-blue-600 cursor-wait' 
                      : 'bg-gray-200 hover:bg-blue-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isReactivationInProgress ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
              
                </button>
              </div>
              
              {/* Статус процесса */}
              {isReactivationInProgress && (
                <div className="flex items-center justify-center space-x-2 text-xs text-blue-600">
                  <Power className="w-3 h-3 animate-pulse" />
                  <span>Реактивация...</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StandardTradingAccountCard;
