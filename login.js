
import { ethers } from "./libs/ethers-5.1.esm.min.js";

window.provider = window.passport.connectEvm();

const connectPassport = async function(){
    window.accounts = await window.provider.request({ method: "eth_requestAccounts" });
    if (window.accounts){
        getUserInfo();
    }

}

const getUserInfo = async function(){
    window.userProfile = await window.passport.getUserInfo();
    console.log("userrrrrr", window.userProfile);
}

const passportLogout = async function(){
    let logout = await window.passport.logout();
    console.log(logout, "logout");
    window.userProfile = {};
}

const CONTRACT_ADDRESS = '0x84f776D599C53bf42357ca9C0E69040E294c5642'; // The address of the deployed collection contract
const TOKEN_ID = '1'; // The ID of the minted token

const config = {
  baseConfig: new window.immutable.config.ImmutableConfiguration({
    environment: window.immutable.config.Environment.SANDBOX,
  }),
};

const client = new window.immutable.blockchainData.BlockchainData(config);

const transTokenContractTest = async function () {
    if (window?.provider) {
        const provider = new ethers.providers.Web3Provider(window.provider)
        window.signer = provider.getSigner();
        const userAddress = await window.signer.getAddress();
        const toAddress = window.accounts[0];

        console.log("userAddress", userAddress);
        console.log("toAddress", toAddress);
        const erc721ContractAddress = '0x84f776D599C53bf42357ca9C0E69040E294c5642';

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
            TOKEN_ID,
        );

        // Wait for the transaction to complete
        const resp = await tx.wait();

        console.log("resp contract", resp);
    } else {
        console.log("no signer");
    }
}

// GET TOKEN DATA
async function getData() {
  try {
    const response = await client.getNFT({
      chainName: 'imtbl-zkevm-testnet',
      contractAddress: CONTRACT_ADDRESS,
      tokenId: TOKEN_ID,
    });
    console.log(response.result);
    let nft = document.getElementById("nft");
    nft.innerHTML = `
    <div class="alert alert-success"> Great Score! You can have this token now.</div>
    <div class="card" >
    <div class="card-body">
      <div class="media">
        <img src='${response.result.image}' class="mr-3 img-thumbnail" alt="nft" style="width: 30%;">
        <div class="media-body">
          <h5 class="card-title">${response.result.name}</h5>
          <p class="card-text">'${response.result.description}'</p>    
        </div>
      </div>
    </div>
    <div class="card-body">
      <button id="claim-btn" class="btn btn-success"> Claim</button>
    </div>
  </div>
    `;
    const claimBtn = this.document.getElementById('claim-btn');
    claimBtn.onclick = function(){
        transTokenContractTest();
    }

    return response.result;
  } catch (error) {
    console.error(error);
    alert(error)
  }
}

window.getData = getData;

window.addEventListener('load', function() {
    const passportBtn = this.document.getElementById('btn-passport');
    const logoutBtn = this.document.getElementById('btn-logout');
    
    passportBtn.onclick = function(){
       window.siconnecting = true;
       connectPassport();
    }

    logoutBtn.onclick = passportLogout;
    window.passport.loginCallback();
});




