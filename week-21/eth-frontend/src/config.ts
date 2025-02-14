import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { metaMask, injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    metaMask()
  ],
	  transports: {
	    [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/02RfDld8FSNkt6LNuvBQWXwejneybGP9"),
  },
})