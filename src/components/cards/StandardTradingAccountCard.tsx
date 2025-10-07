import { useState } from "react";
import type { StandardTradingAccount } from "../../types/account";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { openDepositModal } from "../../store/modalSlice";
import { X, Wallet, Power } from "lucide-react";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { MiniChart } from "../common";

interface StandardTradingAccountCardProps {
  account: StandardTradingAccount;
}

const StandardTradingAccountCard = ({
  account,
}: StandardTradingAccountCardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isReactivationInProgress, setIsReactivationInProgress] =
    useState(false);
  const { showSnackbar } = useCustomSnackbar();

  const handleDeposit = () => {
    dispatch(openDepositModal(account.id));
  };

  const handleToggleReactivation = async () => {
    setIsReactivationInProgress(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Реактивация счета:", account.id);

      showSnackbar(t("common.accountReactivated", { id: account.id }), {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.error("Ошибка при реактивации счета:", error);
      showSnackbar(t("common.accountReactivationError"), {
        variant: "error",
        autoHideDuration: 4000,
      });
    } finally {
      setIsReactivationInProgress(false);
    }
  };

  const getCurrencySymbol = (accountId: string) => {
    return accountId.includes("EUR") ? "EUR" : "USD";
  };

  const currency = getCurrencySymbol(account.id);
  const isActive = account.active;
  const isDemo = account.demo;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-64 flex flex-col">
      <div
        className={`px-4 py-3 ${isActive ? "bg-blue-100" : "bg-purple-100"}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {!isActive && <X className="w-5 h-5 text-red-500" />}
            <span className="font-medium text-gray-800">
              {isDemo ? `DEMO - ${account.id}` : account.id}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-600">{currency}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        {isActive ? (
          <>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                {t("account.equity")} - {account.equity}
                {currency.toLowerCase()}
              </div>
              <div className="text-sm text-gray-600">
                {t("account.leverage")} - 1:{account.leverage}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              {!isDemo && (
                <button
                  onClick={handleDeposit}
                  className="group flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Wallet className="w-10 h-10 group-hover:scale-110 transition-transform duration-200" />
                  <span className="tracking-wide">{t("account.deposit")}</span>
                </button>
              )}

              <MiniChart
                data={[20, 25, 20, 17, 15, 10, 20, 25, 20, 17, 15, 10]}
                trend="up"
                size="lg"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                {t("account.equity")} - {account.equity}
                {currency.toLowerCase()}
              </div>
              <div className="text-sm text-gray-600">
                {t("account.leverage")} - 1:{account.leverage}
              </div>
            </div>

            <div className="flex justify-center items-center mt-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-4">
                  {t("common.accountDeactivated")}
                </div>

                <div className="flex items-center justify-center space-x-3 mb-4">
                  <span className="text-xs text-gray-500">{t("common.reactivate")}</span>
                  <button
                    onClick={handleToggleReactivation}
                    disabled={isReactivationInProgress}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isReactivationInProgress
                        ? "bg-blue-600 cursor-wait"
                        : "bg-gray-200 hover:bg-blue-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isReactivationInProgress
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {isReactivationInProgress && (
                  <div className="flex items-center justify-center space-x-2 text-xs text-blue-600">
                    <Power className="w-3 h-3 animate-pulse" />
                    <span>{t("common.reactivating")}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StandardTradingAccountCard;
