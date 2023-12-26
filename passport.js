window.passport = new window.immutable.passport.Passport({
    baseConfig: new window.immutable.config.ImmutableConfiguration({
      environment: window.immutable.config.Environment.SANDBOX,
    }),
    clientId: 'U9hS470EzhBudFLqRzamxXK4Ne5U1gLK',
    redirectUri: 'https://stackinvaders.vercel.app',
    logoutRedirectUri: 'https://stackinvaders.vercel.app/logout.html',
    audience: 'platform_api',
    scope: 'openid offline_access email transact'
  });

