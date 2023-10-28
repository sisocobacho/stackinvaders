const passport = new window.immutable.passport.Passport({
  baseConfig: new window.immutable.config.ImmutableConfiguration({
    environment: window.immutable.config.Environment.SANDBOX,
  }),
  clientId: 'e6lS9dxoPiDfNRu33C1PslqpTnVYcVJw',
  redirectUri: 'https://stackinvaders.vercel.app/game.html',
  logoutRedirectUri: 'https://stackinvaders.vercel.app/logout.html',
  audience: 'platform_api',
  scope: 'openid offline_access email transact'
});

const provider = passport.connectEvm();
const accounts = await provider.request({ method: "eth_requestAccounts" });
// window.addEventListener('load', function() {
//     passport.loginCallback();
// });

// passport.logout();

const userProfile = await passport.getUserInfo();

console.log("userrrrrr", userProfile);
