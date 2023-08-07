import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMintModalVisible } from '@/store/modules/MintStatusReducer';
import { useTranslation } from 'react-i18next';

type MintSuccessControlType = 'renewal' | 'manual';

const MintStatusModal = (): JSX.Element | undefined => {
  const { isLoading, isSuccess, isError, modalVisible } = useSelector(
    (state: any) => state.mintStatus
  );
  const { t } = useTranslation('status', { keyPrefix: 'mint' });
  const dispatch = useDispatch();

  const handleUpdateMintModalVisible = () => {
    dispatch(updateMintModalVisible(false));
  };

  const handleSuccessStatus = (type: MintSuccessControlType) => {
    if (type === 'renewal') {
      setTimeout(() => {
        handleUpdateMintModalVisible();
      }, 3000);
    }

    if (type === 'manual') {
      handleUpdateMintModalVisible();
    }
  };

  // 自動的にモーダルを閉じる
  //   useEffect(() => {
  //     if (isSuccess) {
  //       handleSuccessStatus('renewal');
  //       return () => handleSuccessStatus('renewal');
  //     }
  //   }, [isSuccess]);

  if (modalVisible) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[350px] flex flex-col">
          {/* <button
              className="text-white text-xl place-self-end"
              //   onClick={handleModal}
            >
              X
            </button> */}

          <div className="bg-white p-5 rounded text-center">
            <div className="flex flex-col justify-center items-center px-5 py-5">
              <div className="flex flex-col justify-center items-center w-32 h-32 border border-solid border-black border-1 px-2 py-5 mb-5">
                {isLoading && !isSuccess && (
                  <p className="whitespace-pre-line text-center">{`ゲームと同じ\nミミックのやつ`}</p>
                )}
                {isSuccess && (
                  <p className="whitespace-pre-line text-center">{`genesisNFT\nimage`}</p>
                )}
              </div>
              {isLoading && !isSuccess && (
                <p className="whitespace-pre-line text-center">
                  {t('loading_msg')}
                </p>
              )}
              {isSuccess && (
                <p className="whitespace-pre-line text-center">
                  {t('success_msg')}
                </p>
              )}

              {isSuccess && (
                <button
                  className="w-full rounded bg-[#F8CC1B] px-5 py-3 mt-5"
                  onClick={() => handleSuccessStatus('manual')}
                >
                  {t('confirm')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MintStatusModal;
