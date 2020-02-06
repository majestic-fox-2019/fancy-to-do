$(document).ready(function () {
    checkLogin()
    $("#goRegister").on("click", function (e) {
        e.preventDefault()
        $("#loginPage").fadeOut('slow')
        $("#registerPage").fadeIn('slow')
    })

    $("#goLogin").on("click", function (e) {
        e.preventDefault()
        $("#registerPage").fadeOut('slow')
        $("#loginPage").fadeIn('slow')
    })

    $("#loginForm").on("submit", function (e) {
        e.preventDefault()
        const email = $("#email").val()
        const password = $("#password").val()
        fromLogin(email, password)
    })

    $("#registerForm").on("submit", function (e) {
        e.preventDefault()
        const email = $("#emailRegister").val()
        const password = $("#passwordRegister").val()
        const fullname = $("#fullnameRegister").val()
        fromRegister(email, password, fullname)
    })

    $("#myProject").on("click", function (e) {
        e.preventDefault()
        $('#completed').empty()
        $('#todo').empty()
        $("#colProject").fadeIn('slow')
    })

    $("#myTodo").on("click", function (e) {
        e.preventDefault()
        $("#colProject").fadeOut('slow')
    })
})

function onSignIn(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token
    $.ajax({
        method: "POST",
        url: `${baseUrl}/users/login/google`,
        data: { idToken }
    })
        .done((response) => {
            localStorage.setItem('token', response.token)
            localStorage.setItem('id', response.user.id)
            localStorage.setItem('email', response.user.email)
            localStorage.setItem('fullname', response.user.fullname)
            localStorage.setItem('picture', response.user.picture)
            checkLogin()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `welcome ${response.user.fullname}`,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON.message
            })
        })
}

function fromLogin(email, password) {
    $.ajax({
        method: "POST",
        url: `${baseUrl}/users/login`,
        data: {
            email,
            password
        }
    })
        .done((response) => {
            const { id, fullname, email } = response.user
            localStorage.setItem('token', response.token)
            localStorage.setItem('id', id)
            localStorage.setItem('fullname', fullname)
            localStorage.setItem('email', email)
            checkLogin()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `welcome ${response.user.fullname}`,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function fromRegister(email, password, fullname) {
    $.ajax({
        method: "POST",
        url: `${baseUrl}/users/register`,
        data: {
            fullname,
            email,
            password
        }
    })
        .done((response) => {
            const { token, id, fullname, email } = response
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
            localStorage.setItem('fullname', fullname)
            localStorage.setItem('email', email)
            checkLogin()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `welcome ${response.user.fullname}`,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Status : ' + err.status,
                text: err.responseJSON
            })
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear()
        checkLogin()
    });
}

function checkLogin() {
    if (localStorage.getItem("token") == null) {
        $("#loginRegister").show()
        $("#loginPage").show()
        $("#navbarApp").hide()
        $("#mainPage").hide()
        $('#completed').empty()
        $('#todo').empty()
    } else {
        $("#loginRegister").hide()
        $("#navbarApp").fadeIn('slow')
        $('#mainPage').show()
    }
}