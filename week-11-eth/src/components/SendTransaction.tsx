import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { type BaseError } from 'wagmi'

export function SendTransaction() {
    const {data: hash, error, isPending, sendTransaction} = useSendTransaction()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const to = formData.get('address') as `0x${string}`
        const value = formData.get('value') as string
        
        sendTransaction({ 
            to, 
            value: parseEther(value)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="address" placeholder="0xA0Cf…251e" required />
                <input
                    name="value"
                    placeholder="0.05"
                    required
                    type="number"
                    step="0.000000000000000001"
                />
                <button disabled={isPending}>
                    {isPending ? 'Confirming...' : 'Send'}
                </button>
            </form>
            
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
                <div>Error: {(error as BaseError).shortMessage || error.message}</div>
            )}
        </div>
    )
}
