import React from 'react';
import type { AppTradingAccount } from '../../types/account';
import { Smartphone } from 'lucide-react';

interface AppTradingAccountCardProps {
  account: AppTradingAccount;
}

const AppTradingAccountCard: React.FC<AppTradingAccountCardProps> = ({ account }) => {
  const handleAppAction = () => {
    // Проверяем, является ли устройство мобильным
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // На мобильном устройстве пытаемся открыть приложение
      // В реальном приложении здесь будет deep link
      console.log('Открытие мобильного приложения для счета:', account.id);
      // Пример deep link: window.location.href = 'myapp://account/' + account.id;
    } else {
      // На компьютере перенаправляем в магазин приложений
      // В реальном приложении здесь будет определение платформы и соответствующий URL
      const appStoreUrl = 'https://apps.apple.com/app/your-app'; // App Store
      const playStoreUrl = 'https://play.google.com/store/apps/details?id=your.app'; // Google Play
      
      // Простая логика определения платформы
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const storeUrl = isIOS ? appStoreUrl : playStoreUrl;
      
      window.open(storeUrl, '_blank');
    }
  };

  return (
    <div className="bg-blue-600 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-blue-600">
        <div className="text-white font-medium">
          App Trading account
        </div>
      </div>

      {/* Body */}
      <div className="p-4 bg-blue-600">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <div className="text-sm">
              Balance - {account.balance}usd
            </div>
          </div>
          
          <button
            onClick={handleAppAction}
            className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
          >
            <Smartphone className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppTradingAccountCard;
