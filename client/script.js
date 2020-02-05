var $login = $('#loginForm')
$login.on('submit', function(evt){
    evt.preventDefault()
    let email = $login.find('#email').val()
    let password = $login.find('#password').val()
    console.log(email, password)
})