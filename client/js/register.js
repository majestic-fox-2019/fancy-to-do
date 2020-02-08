if (typeof registerUser != 'function') {
    function registerUser(emailRegister, passwordRegister){
        $.ajax({
            method: "POST",
            url: `${BACKEND_URL}/users/register`,
            data: {email: emailRegister, password: passwordRegister}
        })
        .then(newUser => {
            setSuccessAlert();
            showAlert();
            clearRegisterForm();
            setTimeout(() => {
                hideAlert();
                showLoginModal();
            }, 1000);

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
    const clearRegisterForm = () => {
        $("#emailRegister").val("");
        $("#passwordRegister").val("");
    }
   

    const hideRegisterModal = () => {
        $(".modalRegister > .close").click();
    }

    $("#btnLogin2").on('click', function(){
        $("#btnLogin").click();
    });

    $("#btnRegister").on('click', () => {
        $('.ui.modal.modalRegister').modal({closable: false}).modal('show');
    });

    $("#btnSubmitRegister").on('click', () => {
        let emailRegister       = $("#emailRegister").val();
        let passwordRegister    = $("#passwordRegister").val();
        registerUser(emailRegister, passwordRegister);
    });

    $("#alert > .close").on('click', () => {
        $("#alert").hide();
    });
});