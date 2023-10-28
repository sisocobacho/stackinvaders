
window.provider = window.passport.connectEvm();
window.accounts = await window.provider.request({ method: "eth_requestAccounts" });
// window.addEventListener('load', function() {
    window.passport.loginCallback();
// });

// passport.logout();


