import { useTranslation } from 'react-i18next';

const PaymentInfo = () => {
  const { t } = useTranslation('common', { keyPrefix: 'payment' });
  return (
    <div className="flex flex-row justify-between items-center w-full px-10 mb-5">
      <p className="text-lg">{t('title')}</p>
      <p className="text-lg">{t('matic', { price: 0.001 })}</p>
    </div>
  );
};

export default PaymentInfo;
