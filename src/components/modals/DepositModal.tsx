import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeDepositModal } from '../../store/modalSlice';
import type { RootState } from '../../store';
import Modal from '../common/Modal';

const DepositModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpen, accountId } = useSelector(
    (state: RootState) => state.depositModal
  );
  const [amount, setAmount] = useState('');

  const handleClose = () => {
    dispatch(closeDepositModal());
    setAmount('');
  };

  const handleDeposit = () => {
    if (amount && accountId) {
      console.log(`Депозит ${amount} на счет ${accountId}`);
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('modals.deposit.title')}
    >
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          {t('common.account')}: {accountId}
        </p>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('modals.deposit.amount')}
        </label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('common.enterAmount')}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={handleClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          {t('modals.deposit.cancel')}
        </button>
        <button
          onClick={handleDeposit}
          disabled={!amount}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('modals.deposit.deposit')}
        </button>
      </div>
    </Modal>
  );
};

export default DepositModal;
