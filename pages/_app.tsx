import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { wrapper } from '@/store';

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';
const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY || '';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  // process.env.NODE_ENV === 'product' ?  [polygon] : [goerli],
  [goerli],
  [
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
    infuraProvider({ apiKey: INFURA_API_KEY }),
    publicProvider(),
  ]
);

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        appInfo={demoAppInfo}
        chains={chains}
        theme={darkTheme({
          borderRadius: 'small',
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default appWithTranslation(wrapper.withRedux(MyApp));
