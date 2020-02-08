function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: "post",
        url: `${endpoint}/google-signin`,
        data: { id_token }
    }).done(response => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('email', response.email)
        userloggedIn()
    }).fail(err => {
        Request.createError(err)
    })
}

const signOut = () => {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}