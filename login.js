
window.provider = window.passport.connectEvm();

// document.ready
// window.accounts = await window.provider.request({ method: "eth_requestAccounts" });

const connectPassport = async function(){
    window.accounts = await window.provider.request({ method: "eth_requestAccounts" });
}

const getUserInfo = async function(){
    window.userProfile = await window.passport.getUserInfo();
    console.log("userrrrrr", window.userProfile);
}

window.addEventListener('load', function() {

    const button = this.document.getElementById('btn-passport');
    button.onclick = function(){
       connectPassport();
       window.passport.loginCallback();
       getUserInfo();
    }
    // window.passport.loginCallback();
});

// passport.logout();


