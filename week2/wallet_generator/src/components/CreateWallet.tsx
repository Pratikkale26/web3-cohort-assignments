import { ethers } from "ethers";
import { useState } from "react";

// Wallet Type
interface Wallet {
  pubKey: string;
  pvtKey: string;
  mnemonic?: string;
}


// Create Ethereum wallet
const createEthereumWallet = (): Wallet => {
  const wallet = ethers.Wallet.createRandom();
  return {
    pubKey: wallet.address,
    pvtKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase || "",
  };
};

const CreateWallet = () => {
  const [ethWallet, setEthWallet] = useState<Wallet | null>(null);


  const handleCreateWallet = (coin: string) => {
    setEthWallet(null);

    if (coin === "ethereum") {
      const wallet = createEthereumWallet();
      setEthWallet(wallet);
    } else if (coin === "bitcoin") {
      alert("Bitcoin wallet creation not implemented yet.");
    }
  };

  const resetWallets = () => {
    setEthWallet(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 p-5">
      <h1 className="text-3xl font-semibold text-gray-50 mb-8">Create a New Wallet</h1>

      {/* Wallet Buttons */}
      <div className="space-x-4 mb-8">
        <button onClick={() => handleCreateWallet("ethereum")}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none">
          Create Ethereum Wallet
        </button>

        <button onClick={() => handleCreateWallet("bitcoin")}
          className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-700 focus:outline-none">
          Create Bitcoin Wallet
        </button>
      </div>

      {/* Display Ethereum Wallet Info */}
      {ethWallet && (
        <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-blue-500">Ethereum Wallet</h2>
          <p><strong>Public Key:</strong> {ethWallet.pubKey}</p>
          <p><strong>Private Key:</strong> {ethWallet.pvtKey}</p>
          <p><strong>Mnemonic:</strong> {ethWallet.mnemonic}</p>
        </div>
      )}


      {/* Reset Button */}
      {(ethWallet) && (
        <button
          onClick={resetWallets}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none"
        >
          Reset Wallets
        </button>
      )}
    </div>
  );
};

export default CreateWallet;
