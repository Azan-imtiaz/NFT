require("dotenv").config();
const  API_KEY = process.env.API_KEY;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

console.log(`API_URL: ${API_KEY}`);
console.log(`PUBLIC_KEY: ${PUBLIC_KEY}`);

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_KEY);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const contractAddress = "0x92EA553eB172f71e2e5b7412832FE3eB97a0687a";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  try {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.safeMint(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error("Error while minting NFT:", error);
  }
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmTLkKGXCjmc1vSjHS3gDavsroZpHduV2S1CHaaVnhQPeM");
