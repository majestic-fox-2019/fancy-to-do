const showAlert = () => {
    $("#alert,#alertRegister").show();
}

const hideAlert = () => {
    $("#alert,#alertRegister").hide();
}

const setSuccessAlert = () => {
    $("#alert,#alertRegister").prop('class', 'ui success message');
    $("#alert,#alertRegister > .header").text("Success");
}

const setErrorAlert = (err) => {
    $("#alert,#alertRegister").prop('class', 'ui negative message');
    const {Error, msg, Validations} = err.responseJSON;
    $("#alert,#alertRegister > .header").text(Error || msg || Validations[0])
}

const showBtnLogin = () => {
    $("#btnLogout").hide();
    $("#btnLogin").show();        
}

const showBtnLogout = () => {
    $("#btnLogout").show();
    $("#btnLogin").hide();
}

const showLoginModal = () => {
    $("#btnLogin").click();
}


const checkLogin = () => {
    let emailLoggedIn = localStorage.getItem("email");
    if (emailLoggedIn) {
        showBtnLogout();
        $("#emailLoggedIn").text(emailLoggedIn);
    }else{
        showBtnLogin();
    }
}