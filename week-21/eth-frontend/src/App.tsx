import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useConnect, useConnectors, useDisconnect, WagmiProvider } from 'wagmi'
import './App.css'
import { config } from './config'

const client = new QueryClient();

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
        Pratik kale
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function ConnectWallet() {
  const connectors = useConnectors()
  const {connect} = useConnect();
  const {address} = useAccount()
  const {disconnect} = useDisconnect();

  if(address) {
    return <div>
      You are Connected {address}
      <button onClick={() => {
        disconnect()
      }}>Disconnect</button>
    </div>
  }

  return <div>
    {connectors.map(c => <button onClick={() => {
      connect({connector: c});
    }}>
      Conect Via {c.name}
    </button>)}
  </div>
}

export default App
