
import { WagmiProvider } from 'wagmi'
import './App.css'
import { config } from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletOptions } from './components/WalletOptions'
import { Account } from './components/Account'
import { SendTransaction } from './components/SendTransaction'


const queryClient = new QueryClient()


function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <WalletOptions />
        <Account />
        <SendTransaction />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
