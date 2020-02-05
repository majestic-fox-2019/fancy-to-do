$(document).ready(() => {
    const clearRegisterForm = () => {
        $("#emailRegister").val("");
        $("#passwordRegister").val("");
    }
   

    const hideRegisterModal = () => {
        $(".modalRegister > .close").click();
    }


    $("#btnRegister").on('click', () => {
        $('.ui.modal.modalRegister').modal('show');
    });

    $("#btnSubmitRegister").on('click', () => {
        let emailRegister       = $("#emailRegister").val();
        let passwordRegister    = $("#passwordRegister").val();
        $.ajax({
            method: "POST",
            url: `${BACKEND_URL}/users/register`,
            data: {email: emailRegister, password: passwordRegister}
        })
        .then(newUser => {
            console.log(newUser);
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
    });

    $("#alert > .close").on('click', () => {
        $("#alert").hide();
    });
});