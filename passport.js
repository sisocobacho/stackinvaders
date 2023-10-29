window.passport = new window.immutable.passport.Passport({
    baseConfig: new window.immutable.config.ImmutableConfiguration({
      environment: window.immutable.config.Environment.SANDBOX,
    }),
    clientId: 'e6lS9dxoPiDfNRu33C1PslqpTnVYcVJw',
    redirectUri: 'https://stackinvaders.vercel.app/',
    logoutRedirectUri: 'https://stackinvaders.vercel.app/logout.html',
    audience: 'platform_api',
    scope: 'openid offline_access email transact'
  });


window.userProfile = await window.passport.getUserInfo();

console.log("userrrrrr", window.userProfile);
  