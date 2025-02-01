
import { useAccount, useBalance, useDisconnect } from 'wagmi'

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: balanceData, isLoading: isBalanceLoading } = useBalance({address})

    if (!address) {
        return null
    }

    return (
        <div>
            <h2>Account Information</h2>
            <p><strong>Your address:</strong> {address}</p>
            <p>
                <strong>Your balance:</strong> {
                    isBalanceLoading 
                        ? 'Loading...' 
                        : `${balanceData?.formatted} ${balanceData?.symbol}`
                }
            </p>
            <button onClick={() => disconnect()}>Disconnect</button>
        </div>
    )
}
