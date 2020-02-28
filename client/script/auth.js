$(document).on('click', '#signInButton', function (e) {
    e.preventDefault()
    $('#addClass').removeClass('animated hinge')
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/login',
        type: 'post',
        data: {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        },
        success: function (token) {
            localStorage.setItem('token', token)
            getUserProjects()
            getUserTodos()
            $('#Container').fadeOut()
            $('#LoginModal').modal('hide')
            $('#Main').fadeIn(3000)
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
              })
        }
    })
})

$(document).on('click', '#submitRegister', function(e) {
    e.preventDefault()
    $('#addClass').removeClass('animated hinge')
    $.ajax({
        url:'http://fancy-todo-v2.herokuapp.com/',
        method: 'post',
        data: {
            email: $('#registEmail').val(),
            password: $('#registPassword').val(),
            userName: $('#registUsername').val()
        },
        success: function (token) {
            localStorage.setItem('token', token)
            getUserProjects()
            getUserTodos()
            $('#Container').fadeOut()
            $('#LoginModal').modal('hide')
            $('#Main').fadeIn(3000)
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
              })
        }
    })
})

$(document).on('click', '#logoutButton', function(e) {
    e.preventDefault()
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    $('#main').fadeOut()
    $('#Container').show()
    // $('#main').addClass('animated hinge')
    // $('#main').addClass('hinge')
    // $('#Container').fadeIn(3000)
})

function onSignIn(googleUser) {
    $('#addClass').removeClass('animated hinge')
    let id_token = googleUser.getAuthResponse().id_token;
    // console.log(id_token)
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/googleSign',
        method: 'post',
        data: {
            gToken: id_token
        },
        success: function(token) {
            localStorage.setItem('token', token)
            getUserProjects()
            getUserTodos()
            $('#Container').fadeOut()
            $('#LoginModal').modal('hide')
            $('#Main').fadeIn(3000)
        }
    })
  }