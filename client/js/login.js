$(document).ready(() => {
    checkLogin();

    const clearLoginForm = () => {
        $("#email").val("");
        $("#password").val("");
    }

    const hideLoginModal = () => {
        $(".modalLogin > .close").click();
    }

    $("#btnLogin").on('click', () => {
        $('.ui.modal.modalLogin').modal({closable: false}).modal('show');
    });

    $("#btnSubmitLogin").on('click', () => {
        let email       = $("#email").val();
        let password    = $("#password").val();

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
            $("#btnHome").click();
        })
        .catch(err => {
            setErrorAlert(err);
            showAlert();
            setTimeout(() => {
                hideAlert();
            }, 3000);
        })
    });

    $("#alert > .close").on('click', () => {
        $("#alert").hide();
    });
});