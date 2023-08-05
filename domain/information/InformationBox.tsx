import { useTranslation } from 'react-i18next';

const InformationBox = (): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col justify-center items-center w-full border border-solid border-black border-1 px-5 py-2 mb-2">
      <div className="flex flex-row justify-between items-center w-full">
        <p>{t('date-info-title')}</p>
        <p>{t('date-info-time')}</p>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <p>{t('quantity-info-title')}</p>
        <p>{t('quantity-info-detail', { totalQuantity: 100 })}</p>
      </div>
    </div>
  );
};

export default InformationBox;
