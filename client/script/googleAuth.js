function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: `${url}/users/google/signin`,
        data: {
            token: id_token
        }
    })
    .done(response=>{
        $('#login').hide();
        $('#main_content').show();
        // console.log(response)
        localStorage.setItem('token',response.accessToken)
        checkLogin()
        getData()
        // console.log(localStorage.token)
    })
    .fail(err=>{
        console.log(err);
    })
}