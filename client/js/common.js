const showAlert = () => {
    $("#alert").show();
}

const hideAlert = () => {
    $("#alert").hide();
}

const setSuccessAlert = () => {
    $("#alert").prop('class', 'ui success message');
    $("#alert > .header").text("Login success");
}

const setErrorAlert = (err) => {
    $("#alert").prop('class', 'ui negative message');
    $("#alert > .header").text(err.responseJSON.Error)
}

const showBtnLogin = () => {
    $("#btnLogout").hide();
    $("#btnLogin").show();        
}

const showBtnLogout = () => {
    $("#btnLogout").show();
    $("#btnLogin").hide();
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