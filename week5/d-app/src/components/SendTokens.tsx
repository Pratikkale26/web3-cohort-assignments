import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Buffer } from "buffer";
import { useState } from "react";
globalThis.Buffer = Buffer; // Polyfill Buffer for the browser

export function SendTokens() {
    const { publicKey, sendTransaction, connected } = useWallet();
    const { connection } = useConnection();
    const [error, setError] = useState<string | null>(null);

    async function sendTokens() {
        try {
            // Check if wallet is connected
            if (!connected || !publicKey) {
                throw new Error("Wallet not connected!");
            }

            // Get input values
            const toElement = document.getElementById("to") as HTMLInputElement | null;
            const amountElement = document.getElementById("amount") as HTMLInputElement | null;

            if (!toElement || !amountElement) {
                throw new Error("Input elements not found!");
            }

            const to = toElement.value;
            const amount = parseFloat(amountElement.value);

            // Validate inputs
            if (!to || !amount || isNaN(amount) || amount <= 0) {
                throw new Error("Invalid recipient or amount!");
            }

            // Create a transaction
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(to),
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );

            await sendTransaction(transaction, connection);

            alert(`Sent ${amount} SOL to ${to}`);
            setError(null);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error sending tokens:", error);
            setError(error.message); // Set error message
        }
    }

    return (
        <div className="flex justify-center items-center gap-2">
            <input
                type="text"
                id="to"
                placeholder="Send To"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                id="amount"
                placeholder="Enter Amount"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={sendTokens}
                disabled={!connected}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {connected ? "Send" : "Connect Wallet"}
            </button>
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}