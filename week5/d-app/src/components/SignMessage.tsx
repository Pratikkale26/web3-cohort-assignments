import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useState } from 'react';

export function SignMessage() {
    const { publicKey, signMessage, connected } = useWallet();
    const [error, setError] = useState<string | null>(null);

    async function onClick() {
        try {
            // Check if wallet is connected
            if (!connected || !publicKey) {
                throw new Error('Wallet not connected!');
            }

            // Check if signMessage is supported
            if (!signMessage) {
                throw new Error('Wallet does not support message signing!');
            }

            // Get the message input element
            const messageElement = document.getElementById("message") as HTMLInputElement | null;
            if (!messageElement) {
                throw new Error('Message input not found!');
            }

            // Get the message value
            const message = messageElement.value;
            if (!message) {
                throw new Error('Please enter a message to sign!');
            }

            // Encode the message
            const encodedMessage = new TextEncoder().encode(message);

            // Sign the message
            const signature = await signMessage(encodedMessage);

            // Verify the signature
            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
                throw new Error('Message signature invalid!');
            }

            // Display success message
            alert('Success! Message signature: ' + bs58.encode(signature));
            setError(null);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error signing message:', error);
            setError(error.message); 
        }
    }

    return (
        <div className="flex justify-center items-center gap-4">
            <input
                id="message"
                type="text"
                placeholder="Enter a message to sign"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={onClick}
                disabled={!connected}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {connected ? "Sign Message" : "Connect Wallet"}
            </button>
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}