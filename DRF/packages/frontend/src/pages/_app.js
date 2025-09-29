import '../styles/globals.css';
import { WagmiConfig, createConfig, configureChains, mainnet, sepolia, goerli } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import Layout from '../components/Layout';

const { chains, publicClient } = configureChains(
  [goerli, sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'DRF Platform',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
