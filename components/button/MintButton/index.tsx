import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther } from 'viem';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import merkleTree from '@/sample/artifacts/@openzeppelin/merkletree/merkleTree.json';
import { goerliNftAbi } from '@/sample/artifacts/contracts/goerliNftAbi';
import * as AllowList from '@/store/modules/AllowListReducer';
import { ContractString } from '@/interface/contract/contract.interface';
import { NFT_WRITE_CONTRACT_ADDRESS } from '@/constant/sample/contractAddress';
import { useTranslation } from 'react-i18next';
import {
  updateMintLoadingStatus,
  updateMintSuccessStatus,
} from '@/store/modules/MintStatusReducer';

type MintButtonType = 'main' | 'top';
interface MintButtonProps {
  type: MintButtonType;
}

const MintButton = (props: MintButtonProps): JSX.Element => {
  const { type } = props;
  const { address, isConnected, connector } = useAccount();
  const { isMember } = useSelector((state: any) => state.allowList);
  const dispatch = useDispatch();
  const tree = StandardMerkleTree.load(JSON.parse(JSON.stringify(merkleTree)));
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  const { isLoading: isMintLoading, isSuccess: isMintSuccess } = useSelector(
    (state: any) => state.mintStatus
  );

  // write testing config
  const { config } = usePrepareContractWrite({
    address: NFT_WRITE_CONTRACT_ADDRESS,
    abi: goerliNftAbi,
    functionName: 'mintNFT',
    account: address as ContractString,
    args: [address as ContractString, 'https://google.com'],
    value: parseEther('0.001'),
  });

  const { data, write } = useContractWrite(config);

  // success state for when the transaction is successful
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleMintStatus = () => {
    if (isLoading) {
      dispatch(updateMintLoadingStatus(true));
    }

    if (isSuccess) {
      dispatch(updateMintSuccessStatus(true));
    }
  };

  useEffect(() => {
    if (isLoading || isSuccess) {
      handleMintStatus();
      return () => handleMintStatus();
    }
  }, [isLoading, isSuccess]);

  const handleCheckAllowList = () => {
    let member: string = '';
    let quantity: number = 0;
    let isMember: boolean = false;

    for (const [i, v] of tree.entries()) {
      if (v[0] === address) {
        const proof = tree.getProof(i);

        member = v[0];
        quantity = v[1];
        isMember = true;
      }
    }

    dispatch(AllowList.updateAllowListStatus(isMember));
    dispatch(AllowList.updateAllowListMemberQuantity(quantity));
  };

  useEffect(() => {
    if (typeof address !== 'undefined') {
      handleCheckAllowList();
      return () => handleCheckAllowList();
    }
  }, [address]);

  return (
    <>
      {(!isConnected || isMember) && (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
                className={type === 'main' ? 'w-full' : ''}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        className={
                          type === 'main'
                            ? 'flex flex-row justify-center items-center w-full border border-solid border-black border-1 py-4 mb-10 bg-slate-900'
                            : 'flex flex-row justify-center items-center min-w-100 outline outline-1 px-5 py-2 bg-slate-900'
                        }
                        onClick={openConnectModal}
                        type="button"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                          width={type === 'main' ? 45 : 30}
                          height={type === 'main' ? 20 : 10}
                          alt="metamask"
                          style={{ marginRight: 10 }}
                        />
                        <p className="text-lg text-white">{t('connect')}</p>
                      </button>
                    );
                  }

                  if (connected) {
                    return (
                      <button
                        className={
                          type === 'main'
                            ? 'flex flex-row justify-center items-center w-full border border-solid border-black border-1 py-4 mb-10'
                            : 'flex flex-row justify-center items-center min-w-100 outline outline-1 px-10 py-2 bg-slate-900'
                        }
                        disabled={!write || isMintLoading}
                        onClick={() => write?.()}
                        type="button"
                        style={{
                          background: isMintLoading ? '#e6e6e6' : '#F8CC1B',
                        }}
                      >
                        <p className="text-lg">
                          {isMintLoading ? `${t('minting')}` : `${t('mint')}`}
                        </p>
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        className={
                          type === 'main'
                            ? 'flex flex-row justify-center items-center w-full border border-solid border-black border-1 py-4 mb-10'
                            : 'flex flex-row justify-center items-center min-w-100 outline outline-1 px-10 py-2 bg-slate-900'
                        }
                        onClick={openChainModal}
                        type="button"
                      >
                        <p className="text-lg">{t('network-error')}</p>
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        style={{ display: 'flex', alignItems: 'center' }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      )}
      {isConnected && !isMember && type === 'main' && (
        <div className="flex flex-col justify-center items-center w-full border border-solid border-black border-1 py-4 mb-5 bg-[#e6e6e6]">
          <p className="text-center">{t('member-only-message')}</p>
        </div>
      )}
      {isConnected && !isMember && type === 'top' && (
        <div className="flex flex-row justify-center items-center min-w-100 outline outline-1 px-5 py-2 bg-[#e6e6e6]">
          <p>{t('member-only')}</p>
        </div>
      )}
      {type === 'main' && isSuccess && (
        <div className="flex flex-col justify-center items-center mb-5">
          {t('mint-success')}
          <div>
            <a
              href={`https://etherscan.io/tx/${data?.hash}`}
              className="underline"
            >
              {t('go-etherscan')}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default MintButton;
