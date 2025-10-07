import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeAddAccountModal } from '../../store/modalSlice';
import { addAccount } from '../../store/accountSlice';
import type { RootState } from '../../store';
import { Loader2 } from 'lucide-react';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';
import Modal from '../common/Modal';

const AddAccountModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.addAccountModal);
  const [isCreating, setIsCreating] = useState(false);
  const { showSnackbar } = useCustomSnackbar();

  const handleClose = () => {
    dispatch(closeAddAccountModal());
    setIsCreating(false);
  };

  const handleAddAccount = async (accountType: 'StandardTradingAccount' | 'AppTradingAccount') => {
    setIsCreating(true);
    try {
      const newAccount = await dispatch(addAccount(accountType) as any).unwrap();
      handleClose();
      showSnackbar(t("common.accountCreated", { id: newAccount.id }), {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.error('Ошибка создания счета:', error);
      setIsCreating(false);
      showSnackbar(t("common.accountCreationError"), {
        variant: 'error',
        autoHideDuration: 4000,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t("modals.addAccount.title")}
      showCloseButton={!isCreating}
    >
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("account.standardAccount")}</h3>
        </div>
        
        <button
          onClick={() => handleAddAccount('StandardTradingAccount')}
          disabled={isCreating}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isCreating 
              ? 'cursor-not-allowed bg-gray-300 text-gray-500' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isCreating ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t("common.creating")}</span>
            </div>
          ) : (
            t("modals.addAccount.create")
          )}
        </button>
      </div>
      
      <div className="flex justify-end mt-6">
        <button
          onClick={handleClose}
          disabled={isCreating}
          className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md ${
            isCreating 
              ? 'cursor-not-allowed opacity-50' 
              : 'hover:bg-gray-200'
          }`}
        >
          {t("modals.addAccount.cancel")}
        </button>
      </div>
    </Modal>
  );
};

export default AddAccountModal;
