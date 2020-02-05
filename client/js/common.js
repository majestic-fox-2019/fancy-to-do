const showAlert = () => {
    $("#alert,#alertRegister,#alertTodo,#alertTodoTable").show();
}

const hideAlert = () => {
    $("#alert,#alertRegister,#alertTodo,#alertTodoTable").hide();
}

const setSuccessAlert = () => {
    $("#alert,#alertRegister,#alertTodo,#alertTodoTable").prop('class', 'ui success message');
    $("#alert,#alertRegister,#alertTodo > .header").text("Success");
}

const setErrorAlert = (err) => {
    $("#alert,#alertRegister,#alertTodo,#alertTodoTable").prop('class', 'ui negative message');
    const {Error, msg, Validations} = err.responseJSON;
    let allAlerts = $("#alert,#alertRegister,#alertTodo, #alertTodoTable > .header");
    if (typeof Error.message !== "undefined") {
        alert("a");
        allAlerts.text(Error.message);
    }else{
        allAlerts.text(Error || Validations[0] || msg);
    }
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