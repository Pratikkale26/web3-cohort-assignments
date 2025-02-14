import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useConnect, useConnectors, useDisconnect, useReadContract, WagmiProvider } from 'wagmi'
import './App.css'
import { config } from './config'
import { Address } from 'viem';
import { AllowUSDT } from './AllowUSDT';

const client = new QueryClient();

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
        <TotalSupply />
        <AllowUSDT />
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

function TotalSupply() {
  const {address} = useAccount();
  const { data, isLoading, error } = useReadContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: [
      {"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}
    ],
    functionName: 'balanceOf',
    args: [address?.toString() as Address]
  })

  return <div>
    Total Supply is {data?.toString()}
  </div>
}

export default App
