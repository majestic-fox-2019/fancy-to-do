'use strict'

class User {

  static signIn(e){
  e.preventDefault(e)
  const value = {
    email: $('#emailLogin').val(),
    password: $('#passwordLogin').val()
  }
  $.ajax({
    method: "post",
    url: `${url}/login`,
    data: value
  }).done(function (response) {
    localStorage.setItem('token', response.token)
    $loginPage.hide()
    $headerLogin.hide()
    $registerPage.hide()
    $headerLogoutGoogle.show()
    Task.list()
    $listPage.show()
  }).fail(err => {
    console.log(err)
  })
  }

  static signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    localStorage.removeItem('token')
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
    $loginPage.fadeIn(2000)
    $headerLogin.fadeIn(2000)
    $headerLogoutGoogle.fadeOut(1000)
    $listPage.fadeOut(1000)
    $('#emailLogin').val('')
    $('#passwordLogin').val('')
  }

  static onSignIn(googleUser){
    console.log('tes bro')
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      type: "POST",
      url: `${url}/login/google`,
      data: {
        googleToken: id_token
      }
    })
    .done(response => {
      console.log(response)
      localStorage.setItem('token', response.token)
      $loginPage.fadeOut(1000)
      $headerLogin.hide()
      $registerPage.fadeOut(1000)
      $headerLogoutGoogle.fadeIn(3000)
      $listPage.fadeIn(2000)
      Task.list()
    })
    .fail(error => {
      console.log(error);
    })
  }
  
  static register(e) {
    e.preventDefault()
    const value = {
      email: $('#emailRegister').val(),
      password: $('#passwordRegister').val()
    }
    $.ajax({
      method: "post",
      url: `${url}/user`,
      data: value
    }).done(function (response) {
      $loginPage.show()
      console.log(response)
    }).fail(err => {
      console.log(err)
    })
  }
}

function onSignIn(googleUser){
  return User.onSignIn(googleUser)
}