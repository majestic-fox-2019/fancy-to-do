$(document).ready(() => {
    const clearLoginForm = () => {
        $("#email").val("");
        $("#password").val("");
    }

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

    const hideLoginModal = () => {
        $(".modalLogin > .close").click();
    }

    const showBtnLogin = () => {
        $("#btnLogout").hide();
        $("#btnLogin").show();        
    }

    const showBtnLogout = () => {
        $("#btnLogout").show();
        $("#btnLogin").hide();
    }

    $("#btnLogin").on('click', () => {
        $('.ui.modal.modalLogin').modal('show');
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
            setSuccessAlert();
            showAlert();
            clearLoginForm();
            setTimeout(() => {
                hideAlert();
                hideLoginModal();
            }, 1000);
            showBtnLogout();
        })
        .catch(err => {
            setErrorAlert(err);
            showAlert();
            setTimeout(() => {
                hideAlert();
            }, 3000);
            showBtnLogin();
        })
    });

    $("#alert > .close").on('click', () => {
        $("#alert").hide();
    });


});