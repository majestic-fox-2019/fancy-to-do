const showAlert = () => {
    $(".messageClass").show();
}

const hideAlert = () => {
    $(".messageClass").hide();
    $(".messageClass > .header").val("");

}

const setSuccessAlert = () => {
    $(".messageClass").prop('class', 'ui success message messageClass');
    $(".messageClass > .header").text("Success");
}

const setErrorAlert = (err) => {
    $(".messageClass").prop('class', 'ui negative message messageClass');
    const {Error, msg, Validations} = err.responseJSON;
    let allAlerts = $(".messageClass > .header");
    if(Error) {
        allAlerts.text(Error);
    }
    else if (Validations[0]) {
        allAlerts.text(Validations[0]);
    }else if(msg){
        allAlerts.text(msg);
    }else{
        allAlerts.text(Error.messageClass);
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
        $('.modalLogin').modal({closable: false}).modal('show');
        showBtnLogin();
    }
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let email   = profile.getEmail();
    $("#email").val(email);
    if (!localStorage.getItem("email")) {
        registerUser(email, "123") // asumsi default password user yang sign in by google adalah 123
    }
}
  
function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  $(document).ready(function() {
    $("#todo").click();
  });

  $(window).on('load',function() {
      $(".active").click();
  })