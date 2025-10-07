import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { openAddAccountModal } from "../../store/modalSlice";
import type { RootState } from "../../store";
import { Plus, AlertTriangle } from "lucide-react";

const AddAccountCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  const activeAccountsCount = accounts.filter(
    (account) => account.type === "StandardTradingAccount" && account.active
  ).length;

  const canAddAccount = activeAccountsCount < 5;

  const handleAddAccount = () => {
    if (canAddAccount) {
      dispatch(openAddAccountModal());
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleAddAccount}
        disabled={!canAddAccount}
        className={`group relative flex items-center justify-center rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          canAddAccount
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
        style={{
          width: "56px",
          height: "56px",
        }}
      >
        {canAddAccount ? (
          <Plus className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
        ) : (
          <AlertTriangle className="w-6 h-6" />
        )}

        <div
          className={`absolute bottom-full right-0 mb-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
            canAddAccount
              ? "bg-gray-900 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {canAddAccount ? (
            <div className="text-center">
              <div className="font-semibold">{t("account.addAccount")}</div>
              <div className="text-xs text-gray-300">
                {t("common.available")}: {5 - activeAccountsCount} {t("common.of")} 5
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="font-semibold">{t("common.limitReached")}</div>
              <div className="text-xs text-gray-300">{t("common.maxAccounts")}</div>
            </div>
          )}
          <div
            className={`absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
              canAddAccount ? "border-t-gray-900" : "border-t-gray-700"
            }`}
          ></div>
        </div>
      </button>
    </div>
  );
};

export default AddAccountCard;
