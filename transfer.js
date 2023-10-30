import { ethers } from "libs/ethers-5.1.esm.min.js";

console.log(ethers)

const userAddress = await window.signer.getAddress();
const toAddress = window.accounts[0];
const erc721ContractAddress = '0x84f776D599C53bf42357ca9C0E69040E294c5642';
const tokenId = 1;

// Construct the contract interface using the ABI
const contract = new ethers.Contract(
    erc721ContractAddress,
    [
        'function safeTransferFrom(address from, address to, uint256 tokenId)',
    ],
    window.signer,
);

const tx = await contract.safeTransferFrom(
    userAddress,
    toAddress,
    tokenId,
);

// Wait for the transaction to complete
await tx.wait();
// Your code here...