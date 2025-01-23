
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './components/Airdrop';
import { ShowSolBalance } from './components/ShowSolBal';
import { SignMessage } from './components/SignMessage';
import { SendTokens } from './components/SendTokens';

function App() {
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/02RfDld8FSNkt6LNuvBQWXwejneybGP9"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 ml-30">Week-5</h1>
              <div className="flex space-x-4 gap-4 max-w-[70]">
                <WalletMultiButton className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4" />
                <WalletDisconnectButton className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" />
              </div>
            </div>

            {/* Components */}
            <div className="space-y-6">
              <Airdrop />
              <ShowSolBalance />
              <SignMessage />
              <SendTokens />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;