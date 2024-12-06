import { createPublicClient, http, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts'

const privateKey = import.meta.env.VITE_PRIVATE_KEY; 
export const account = privateKeyToAccount(`0x${privateKey}`);

const amoy = {
  id: 80002, 
  name: "Polygon Amoy",
  network: "amoy",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: { http: ["https://rpc-amoy.polygon.technology/"] },
  },
  blockExplorers: {
    default: { name: "PolygonScan", url: "https://amoy.polygonscan.com" },
  },
};

export const publicClient = createPublicClient({
  chain: amoy,
  transport: http(),
});

export const walletClient = createWalletClient({
    account: account,
    chain: amoy,
    transport: http(),
  });
