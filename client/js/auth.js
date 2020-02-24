function login(form) {
  axios
    .post(`${BASE_URL}/users/login`, form)
    .then(result => {
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('id', result.data.result.id)
      $('#email-login').val('')
      $('#password-login').val('')
      fetchUserTodo()
      showInvitations()
      fetchUserProjects()
      closeHome()
      $('#loginModal').modal('close')
      $('#welcome').append(`<h5>Hello, ${result.data.result.email}</h5>`)
      M.toast({ html: `Login success`, classes: 'green lighten-1' })
    })
    .catch(err => {
      const errors = err.response.data.err
      errors.forEach(el => {
        M.toast({
          html: `${err.response.status} | ${el}`,
          classes: 'red darken-2'
        })
      })
    })
}

function register(form) {
  axios
    .post(`${BASE_URL}/users/register`, form)
    .then(result => {
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('id', result.data.result.id)
      $('#email').val('')
      $('#password').val('')
      fetchUserTodo()
      showInvitations()
      fetchUserProjects()
      closeHome()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank you for registering to our app, Welcome!',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      })
      M.toast({ html: `Registration success`, classes: 'green lighten-1' })
    })
    .catch(err => {
      console.log(err.response)
      const errors = err.response.data.err
      errors.forEach(el => {
        M.toast({
          html: `${err.response.status} | ${el}`,
          classes: 'red darken-2'
        })
      })
    })
}

function onSignIn(googleUser) {
  var idToken = googleUser.getAuthResponse().id_token
  axios
    .post(`${BASE_URL}/users/google`, { idToken: idToken })
    .then(result => {
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('id', result.data.result.id)
      fetchUserTodo()
      showInvitations()
      fetchUserProjects()
      closeHome()
      $('loginModal').modal('close')
      M.toast({ html: `Login success`, classes: 'green lighten-1' })
    })
    .catch(err => {
      console.log(err.response)
      const errors = err.response.data.err
      errors.forEach(el => {
        M.toast({
          html: `${err.response.status} | ${el}`,
          classes: 'red darken-2'
        })
      })
    })
}
