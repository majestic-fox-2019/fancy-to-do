const showAlert = () => {
    $("#alert,#alertRegister,#alertTodo,#alertTodoTable").show();
}

const hideAlert = () => {
    $("#alert,#alertRegister,#alertTodo,#alertTodoTable").hide();
}

const setSuccessAlert = () => {
    $("#alert,#alertRegister,#alertTodo,#alertTodoTable").prop('class', 'ui success message');
    $("#alert,#alertRegister,#alertTodo,#alertTodoTable > .header").text("Success");
}

const setErrorAlert = (err) => {
    $("#alert,#alertRegister,#alertTodo,#alertTodoTable").prop('class', 'ui negative message');
    const {Error, msg, Validations} = err.responseJSON;
    let allAlerts = $("#alert,#alertRegister,#alertTodo, #alertTodoTable > .header");
    if(Error) {
        allAlerts.text(Error);
    }
    else if (Validations[0]) {
        allAlerts.text(Validations[0]);
    }else if(msg){
        allAlerts.text(msg);
    }else{
        allAlerts.text(Error.message    );
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