import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  useAccount,
  useBalance,
  useConnect,
  useContractReads,
  usePublicClient,
  useWalletClient,
} from 'wagmi';
import { useIsMounted } from '../hooks/useIsMounted';
import { useContractRead } from 'wagmi';
import { abi } from '../artifacts/contracts/abi';
import { wagmiAbi } from '../artifacts/contracts/wagmiAbi';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import fs from 'fs';
import merkleTree from '../artifacts/@openzeppelin/merkletree/merkleTree.json';
import { useCallback, useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Box, Flex } from '@chakra-ui/react';

type BuyQuantityType = 'increment' | 'decrement';

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
  // const provider = usePublicClient();
  const [possibleQuantity, setPossibleQuantity] = useState<number>(0);
  const [buyQuantity, setBuyQuantity] = useState<number>(0);

  const TEST_ADDRESS = '0x06FF5d4540e6bAd851736aD8Dd1e0649Ef54f24a';
  const WAGMI_ADDRESS = '0xeCB504D39723b0be0e3a9Aa33D646642D1051EE1';
  const MERKLE_TREE_TXT =
    '0xc954c7da4fc7b23ddeea95b739c07b15bc271e6b607bde29cf557f0c45e6f0e9';
  const OTHER_WALLET_ADDRESS = '0x1111111111111111111111111111111111111111';

  // const { data, error, isError, isLoading } = useContractRead({
  //   address: TEST_ADDRESS,
  //   abi,
  //   functionName: 'symbol',
  // });

  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  // const { data: walletClient } = useWalletClient();
  // console.log('walletClient?', walletClient);

  // const {
  //   data: balanceOfData,
  //   error: balanceOfError,
  //   isError: balanceOfIsError,
  //   isLoading: balanceOfIsLoading,
  // } = useContractRead({
  //   address: TEST_ADDRESS,
  //   abi,
  //   functionName: 'balanceOf',
  //   args: [address ? `${address}` : undefined],
  // });

  const erc721Contract = {
    address: TEST_ADDRESS,
    abi,
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

  // const { data, isError, isLoading } = useContractReads({
  //   contracts: contractArr,
  //   watch: true,
  //   onSettled(data) {
  //     console.log('Settled', data);
  //   },
  // });

  console.log('====================================');
  // console.log('test balanceOfData ??', balanceOfData);
  console.log('balance data ??', data);
  console.log('====================================');

  // const getBalanceOfHandler = (payload: any) => {
  //   const {
  //     data: balanceOfData,
  //     error: balanceOfError,
  //     isError: balanceOfIsError,
  //     isLoading: balanceOfIsLoading,
  //   } = useContractRead({
  //     address: TEST_ADDRESS,
  //     abi,
  //     functionName: 'balanceOf',
  //     args: [address],
  //   });

  //   console.log('====================================');
  //   console.log('test balanceOfData ??', balanceOfData);
  //   console.log('====================================');
  // };

  // useEffect(() => {
  //   if (address) {
  //     getBalanceOfHandler(address);

  //     return () => getBalanceOfHandler(address);
  //   }
  // }, [address]);

  const handleBuyQuantity = (type: BuyQuantityType) => {
    console.log('type?', type);

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

  // Merkle Tree 作成
  // const values = [
  //   ['0xdA19300690e3978fD6aBf56e5A8a58e0453547FB', 10],
  //   ['0x1111111111111111111111111111111111111111', 20],
  // ];
  // const makeTree = StandardMerkleTree.of(values, ['address', 'uint256']);
  // console.log('Merkle Root:', makeTree.root);
  // 0xcd9d4700613b40d93b92299c58041134e6f21fcea1948e8faea0cb90e877f0ed
  // const dump = JSON.stringify(makeTree.dump());
  // console.log('Merkle Dump:', dump);
  // {"format":"standard-v1","tree":["0xc954c7da4fc7b23ddeea95b739c07b15bc271e6b607bde29cf557f0c45e6f0e9"],"values":[{"value":["0xdA19300690e3978fD6aBf56e5A8a58e0453547FB",10],"treeIndex":0}],"leafEncoding":["address","uint256"]}
  // fs.writeFileSync('tree.json', JSON.stringify(tree.dump()));

  // Merkle Tree 検証
  const tree = StandardMerkleTree.load(JSON.parse(JSON.stringify(merkleTree)));
  // const tree = JSON.parse(MERKLE_TREE_TXT);
  // console.log('frontend tree?', tree);

  const handleCheckAllowList = () => {
    let member: string = '';
    let quantity: number = 0;

    for (const [i, v] of tree.entries()) {
      if (v[0] === address) {
        const proof = tree.getProof(i);
        console.log('member Address', v[0]);
        console.log('member quantity', v[1]);
        console.log('Proof:', proof);

        member = v[0];
        quantity = v[1];
      }
    }

    setPossibleQuantity(quantity);
  };

  useEffect(() => {
    handleCheckAllowList();
    return () => handleCheckAllowList();
  }, [address]);

  console.log('connectors?', connectors);

  return (
    <Layout>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          margin={[10, 0, 10, 0]}
          border={1}
          borderColor="#666"
          borderStyle="solid"
          padding={[10, 10, 10, 10]}
        >
          <p>Eternal Crypt - Wizardry BC -</p>
          <p style={{ fontSize: 20 }}>Adventurer Genesis Collection</p>
        </Flex>
        {isMounted && isConnected && (
          <div>
            <h1>Connected to {activeConnector?.name}</h1>
          </div>
        )}

        {/* {connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {isLoading &&
              pendingConnector?.id === connector.id &&
              ' (connecting)'}
          </button>
        ))}

        {error && <div>{error.message}</div>} */}

        <ConnectButton />

        {/* {isMounted && address && (
          <div>
            <p>{address}</p>
            <button onClick={fetchContractGreeting}>
              {address ? 'Fetch Greeting' : 'Please Connect Your Wallet'}
            </button>
          </div>
        )} */}

        {isMounted && address && <p>購入可能数量 {possibleQuantity}個</p>}

        {isMounted && address && (
          <div className={styles.quantityWap}>
            <button
              className={styles.quantityBtn}
              onClick={() => handleBuyQuantity('decrement')}
            >
              -
            </button>
            <p>{buyQuantity}</p>
            <button
              className={styles.quantityBtn}
              onClick={() => handleBuyQuantity('increment')}
            >
              +
            </button>
          </div>
        )}
      </Flex>
    </Layout>
  );
};

export default Home;
