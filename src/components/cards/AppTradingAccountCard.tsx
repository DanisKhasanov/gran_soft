import type { AppTradingAccount } from "../../types/account";
import { useTranslation } from "react-i18next";
import { Smartphone } from "lucide-react";

interface AppTradingAccountCardProps {
  account: AppTradingAccount;
}

const AppTradingAccountCard = ({ account }: AppTradingAccountCardProps) => {
  const { t } = useTranslation();
  const handleAppAction = () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      const appStoreUrl = "https://apps.apple.com"; 
      const playStoreUrl = "https://play.google.com/store"; 

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const storeUrl = isIOS ? appStoreUrl : playStoreUrl;

      window.open(storeUrl, "_blank");
    } else {
      // TODO: add store url
      const storeUrl = "https://google.com";

      window.open(storeUrl, "_blank");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-64 flex flex-col">
      <div className="px-4 py-3 bg-blue-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-800">
              {t("account.appTradingAccount")}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-600">USD</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="text-sm text-gray-600">
          {t("account.balance")} - {account.balance}usd
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleAppAction}
            className="group flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Smartphone className="w-10 h-10 group-hover:scale-110 transition-transform duration-200" />
            <span className="tracking-wide">{t("common.openApp")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppTradingAccountCard;
