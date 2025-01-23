import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function Airdrop() {
    const { publicKey, connected } = useWallet();
    const { connection } = useConnection();

    function sendAirdropToUser() {
        // Check if wallet is connected and publicKey is available
        if (!connected || !publicKey) {
            alert("Wallet not connected. Please connect your wallet first.");
            return;
        }

        const amountInput = document.getElementById("publicKey") as HTMLInputElement | null;
        const amount = amountInput?.value;

        // Validate the amount
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        // Convert amount to lamports (1 SOL = 1,000,000,000 lamports)
        const lamports = Number(amount) * 1000000000;

        // Request airdrop
        connection.requestAirdrop(publicKey, lamports)
            .then(() => {
                alert("Airdropped SOL successfully!");
            })
            .catch((error) => {
                console.error("Airdrop failed:", error);
                alert("Airdrop failed. Please check the console for details.");
            });
    }

    return (
        <div className="flex justify-center items-center gap-2">
            <input
                id="publicKey"
                type="text"
                placeholder="Enter Amount"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={sendAirdropToUser}
                disabled={!connected}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {connected ? "Send Airdrop" : "Connect Wallet"}
            </button>
        </div>
    );
}