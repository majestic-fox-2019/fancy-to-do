const clearLoginForm = () => {
    $("#email").val("");
    $("#password").val("");
}

if(typeof hideLoginModal != "function") {
    function hideLoginModal(){
        $(".modalLogin > .close").click();
        $(".modalRegister > .close").click();
    }
}

if (typeof login != "function") {
    function login(email, password) {
        $.ajax({
            method: "POST",
            url: `${BACKEND_URL}/users/login`,
            data: {email, password}
        })
        .then(token => {
            localStorage.setItem("accesstoken", token.accessToken);
            localStorage.setItem("email", email);

            setSuccessAlert();
            showAlert();
            clearLoginForm();
            setTimeout(() => {
                hideAlert();
                hideLoginModal();
            }, 1000);
            checkLogin();
            $("#todo").click();

        })
        .catch(err => {
            setErrorAlert(err);
            showAlert();
            setTimeout(() => {
                hideAlert();
            }, 3000);
        })
    }
}

$(document).ready(() => {
    checkLogin();

    $("#btnLogin").on('click', () => {
        $('.ui.modal.modalLogin').modal({closable: false}).modal('show');
    });

    $("#btnSubmitLogin").on('click', () => {
        let email       = $("#email").val();
        let password    = $("#password").val();

        login(email, password);
    });

    $("#alert > .close").on('click', () => {
        $("#alert").hide();
    });
});