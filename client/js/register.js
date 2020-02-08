if (typeof registerUser != 'function') {
    function registerUser(emailRegister, passwordRegister){
        $.ajax({
            method: "POST",
            url: `${BACKEND_URL}/users/register`,
            data: {email: emailRegister, password: passwordRegister}
        })
        .then(newUser => {
            const {email, password} = newUser;
            login(email, passwordRegister);
        })
        .catch(err => {
            try {
                login(emailRegister, passwordRegister);
            } catch (error) {
                setErrorAlert(err);
                showAlert();
                setTimeout(() => {
                    hideAlert();
                }, 3000);            
            }
    
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