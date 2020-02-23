function signIn(){
    console.log("masuk function sign in")
    console.log(`email : ${$('#email-sign-in').val()}`)
    $.ajax({
        url: 'http://localhost:3000/user/login/',
        type: 'post',
        data: {
            email : $('#email-sign-in').val(),
            password : $('#password-sign-in').val()
        },
        success : function(response){
            localStorage.setItem('token',response)
            $('#login-section').empty()
            showList()

        },
        error : function(err){
            $('#sign-error-section').slideUp('slow').empty()
            $('#sign-error-section').append(`
            <div class="d-flex justify-content-center text-white m-3" style="background-color: tomato; width: 25%;border-radius: .75rem;">
                <h5>${err.responseJSON.message}</h5>
            </div>
            `).hide().slideDown('slow')
            console.log(err.responseJSON.message)
        }
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;   
    $.post('http://localhost:3000/user/google',{
        token : id_token
    })
    .then(response => {
        localStorage.setItem('token',response)
        $('#login-section').empty()
        showList()
    })
  }