import { http, createConfig } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  appDescription: 'My RainbowKit App Description',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, sepolia]
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
