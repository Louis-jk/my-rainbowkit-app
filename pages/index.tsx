import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import {
  mainnet,
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useContractReads,
  useNetwork,
  usePublicClient,
  useWalletClient,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import Image from 'next/image';
import { parseEther } from 'viem';
import { useDispatch } from 'react-redux';
import { useIsMounted } from '@/hooks/useIsMounted';
import { goerliTokenAbi } from '@/artifacts/contracts/goerliTokenAbi';
import { goerliNftAbi } from '@/artifacts/contracts/goerliNftAbi';
import merkleTree from '@/artifacts/@openzeppelin/merkletree/merkleTree.json';
import { Layout } from '@/components/layout/Layout';
import MintButton from '@/components/button/MintButton';
import * as AllowList from '@/store/modules/AllowListReducer';
import {
  NFT_WRITE_CONTRACT_ADDRESS,
  READ_TEST_CONTRACT_ADDRESS,
} from '@/constant/sample/contract_address';
import { ContractString } from '@/interface/contract/contract.interface';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Footer from '@/components/layout/Footer';
import LocaleModal from '@/components/Modal/LocaleModal';
import Notice from '@/components/Notice';
import TopBanner from '@/domain/banners/TopBanner';
import MiddleBanner from '@/domain/banners/MiddleBanner';
import InformationBox from '@/domain/information/InformationBox';
import InformationPriceAndQuantity from '@/domain/information/InformationPriceAndQuantity';
import PaymentInfo from '@/domain/payment/PaymentInfo';
import GuideBanner from '@/domain/banners/GuideBanner';
import MintStatusModal from '@/components/Modal/MintStatusModal';

const Home: NextPage = () => {
  const { isMounted } = useIsMounted();
  const { address, isConnected, connector: activeConnector } = useAccount();
  const {
    connect,
    connectors,
    error: connectError,
    isLoading: connectLoading,
    pendingConnector,
  } = useConnect();

  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const { t: paymentT } = useTranslation('common', { keyPrefix: 'payment' });

  const [isAllowList, setIsAllowList] = useState<boolean>(false);
  const [possibleQuantity, setPossibleQuantity] = useState<number>(0);
  const [buyQuantity, setBuyQuantity] = useState<number>(0);
  const [isLocaleModalVisible, setLocaleModalVisible] =
    useState<boolean>(false);

  const erc721Contract = {
    address: READ_TEST_CONTRACT_ADDRESS,
    abi: goerliTokenAbi,
  };

  const erc721ContractAddress = {
    ...erc721Contract,
    args: [address],
  };

  const contractArr = [
    {
      ...erc721Contract,
      functionName: 'symbol',
    },
  ];

  if (address) {
    contractArr.push({
      ...erc721ContractAddress,
      functionName: 'balanceOf',
    });
  }

  const { data, isError, isLoading } = useContractReads({
    contracts: contractArr,
    watch: true,
    // onSettled(data) {
    //   console.log('Settled', data);
    // },
  });

  // write testing config
  const { config } = usePrepareContractWrite({
    address: NFT_WRITE_CONTRACT_ADDRESS,
    abi: goerliNftAbi,
    functionName: 'mintNFT',
    account: address,
    args: [address as ContractString, 'https://google.com'],
    value: parseEther('0.001'),
  });

  const { data: contractWriteData, write } = useContractWrite(config);

  // success state for when the transaction is successful
  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess } =
    useWaitForTransaction({
      hash: contractWriteData?.hash,
    });

  // Merkle Tree 検証
  const tree = StandardMerkleTree.load(JSON.parse(JSON.stringify(merkleTree)));
  // const tree = JSON.parse(MERKLE_TREE_TXT);
  // console.log('frontend tree?', tree);

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

    setIsAllowList(isMember);
    dispatch(AllowList.updateAllowListStatus(isMember));
    setPossibleQuantity(quantity);
  };

  useEffect(() => {
    if (typeof address !== 'undefined') {
      handleCheckAllowList();
      return () => handleCheckAllowList();
    }
  }, [address]);

  return (
    <>
      <Layout>
        <TopBanner />
        <MiddleBanner />
        <InformationBox />
        <InformationPriceAndQuantity
          buyQuantity={buyQuantity}
          possibleQuantity={possibleQuantity}
          setBuyQuantity={setBuyQuantity}
        />
        <PaymentInfo />
        <Notice type="notice01" />
        {isMounted && <MintButton type="main" />}
        <Notice type="notice02" />
        <GuideBanner />
        <Footer setLocaleModalVisible={setLocaleModalVisible} />
      </Layout>
      {isMounted && (
        <>
          <LocaleModal
            isVisible={isLocaleModalVisible}
            setLocaleModalVisible={setLocaleModalVisible}
          />
          <MintStatusModal />
        </>
      )}
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}

export default Home;
