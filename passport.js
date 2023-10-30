window.passport = new window.immutable.passport.Passport({
    baseConfig: new window.immutable.config.ImmutableConfiguration({
      environment: window.immutable.config.Environment.SANDBOX,
    }),
    clientId: 'e6lS9dxoPiDfNRu33C1PslqpTnVYcVJw',
    redirectUri: 'https://stackinvaders.vercel.app',
    logoutRedirectUri: 'https://stackinvaders.vercel.app/logout.html',
    audience: 'platform_api',
    scope: 'openid offline_access email transact'
  });


// window.userProfile = await window.passport.getUserInfo();

// console.log("userrrrrr", window.userProfile);

const CONTRACT_ADDRESS = '0x84f776D599C53bf42357ca9C0E69040E294c5642'; // The address of the deployed collection contract
const TOKEN_ID = '1'; // The ID of the minted token

const config = {
  baseConfig: new window.immutable.config.ImmutableConfiguration({
    environment: window.immutable.config.Environment.SANDBOX,
  }),
};

console.log(config, "config")

const client = new window.immutable.blockchainData.BlockchainData(config);

console.log("client", client)

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
      <button onclik="alert('hello')" class="btn btn-success"> claim</button>
    </div>
  </div>
    `;
    return response.result;
  } catch (error) {
    console.error(error);
  }
}
window.getData = getData;

  