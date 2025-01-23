import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
    const { connection } = useConnection();
    const { publicKey, connected } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        async function fetchBalance() {
            if (publicKey) {
                try {
                    const balance = await connection.getBalance(publicKey);
                    setBalance(balance / LAMPORTS_PER_SOL); // Convert lamports to SOL
                } catch (error) {
                    console.error("Error fetching balance:", error);
                    setBalance(null);
                }
            } else {
                setBalance(null);
            }
        }

        fetchBalance();
    }, [publicKey, connection]);

    return (
        <div className="flex justify-center items-center">
            <p className="text-lg font-semibold text-gray-800">SOL Balance:</p>
            <div id="balance" className="text-xl font-bold text-blue-600">
                {connected ? (balance !== null ? ` ${balance} SOL` : "Loading...") : "Wallet not connected"}
            </div>
        </div>
    );
}