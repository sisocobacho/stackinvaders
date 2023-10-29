
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

const passportLogout = async function(){
    let logout = await window.passport.logout();
    console.log(logout, "logout");
}

window.addEventListener('load', function() {

    const passportBtn = this.document.getElementById('btn-passport');
    const logoutBtn = this.document.getElementById('btn-logout');
    passportBtn.onclick = function(){
       connectPassport();
    }

    logoutBtn.onclick = passportLogout;
    // window.passport.loginCallback();

    // window.passport.loginCallback();
    getUserInfo();
});

// passport.logout();


