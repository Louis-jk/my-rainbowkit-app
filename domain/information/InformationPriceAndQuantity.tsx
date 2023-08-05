import { useIsMounted } from '@/hooks/useIsMounted';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

interface InformationPriceAndQuantityProps {
  buyQuantity: number;
  possibleQuantity: number;
  setBuyQuantity: Dispatch<SetStateAction<number>>;
}

type BuyQuantityType = 'increment' | 'decrement';

const InformationPriceAndQuantity = ({
  buyQuantity,
  possibleQuantity,
  setBuyQuantity,
}: InformationPriceAndQuantityProps): JSX.Element => {
  const { t } = useTranslation('common', { keyPrefix: 'payment' });
  const { isMounted } = useIsMounted();
  const { address } = useAccount();

  const handleBuyQuantity = (type: BuyQuantityType) => {
    switch (type) {
      case 'increment':
        if (buyQuantity < possibleQuantity) {
          setBuyQuantity(buyQuantity + 1);
        }
        break;
      case 'decrement':
        if (buyQuantity > 0) {
          setBuyQuantity(buyQuantity - 1);
        }
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full py-2 mb-5">
        <div className="flex flex-row justify-between items-center w-full">
          <p>{t('sales-price')}</p>
          <p>{t('matic', { price: 0.001 })}</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <p>{t('limit-quantity')}</p>
          {isMounted && address ? (
            <p>
              {t('limit-count', {
                count: buyQuantity,
                possibleQuantity,
              })}
            </p>
          ) : (
            <p>xx / yy個</p>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mb-7">
        <button
          className="border border-solid border-black rounded-full w-10 h-10"
          onClick={() => handleBuyQuantity('decrement')}
        >
          -
        </button>
        <div className="flex justify-center items-center border border-solid border-black rounded-lg w-24 min-w-min h-15 py-2 mx-5">
          <p className="text-2xl">{buyQuantity}</p>
        </div>
        <button
          className="border border-solid border-black rounded-full w-10 h-10"
          onClick={() => handleBuyQuantity('increment')}
        >
          +
        </button>
      </div>
    </>
  );
};

export default InformationPriceAndQuantity;
