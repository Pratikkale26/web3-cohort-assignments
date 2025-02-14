import { JsonRpcProvider, id } from "ethers";

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/02RfDld8FSNkt6LNuvBQWXwejneybGP9")

async function pollBlock(blockNumber: number) {
    const logs = await provider.getLogs({
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        fromBlock: blockNumber,
        toBlock: blockNumber,
        topics: [id("Transfer(address,address,uint256)")]       
    })
    console.log(logs);
}
pollBlock(21493826)