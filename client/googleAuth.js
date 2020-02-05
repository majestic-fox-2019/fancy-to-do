function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: `${url}/user/google/signin`,
        data: {
            token: id_token
        }
    })
    .done(response=>{
        $('#login').hide();
        $('#main_content').show();
        localStorage.setItem('token',response)
        getData()
    })
    .fail(err=>{
        console.log(err);
    })
}