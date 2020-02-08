var url = `http://localhost:3000`
var $loginPage = $('#login-page')
var $headerLogin = $('#headerLogin')
var $registerPage = $('#register-page')
var $listPage = $('#list-page')
var $headerLogoutGoogle = $('#headerGoogleLogout')

$(document).ready(() => {
  // FORM //
  $(document).on('click', '#register', Form.registerForm)
  $(document).on('click', '#login', Form.loginForm)
  // TASK //
  $(document).on('click', '#deleteTask', Task.delete)
  $(document).on('click', '#addTaskDone', Task.addTask)
  $(document).on('click', '#updateTaskDone', Task.edit)
  $(document).on('click', '#statusDone', Task.editStatusDone)
  // USER //
  $(document).on('submit', '#form-login', User.signIn)
  $(document).on('submit', '#form-register', User.register)

})


// SYSTEM //


if(localStorage.getItem('token')){
  // HIDE //
  $loginPage.hide()
  $headerLogin.hide()
  $registerPage.hide()
  // SHOW //
  $headerLogoutGoogle.fadeIn(200)
  $listPage.fadeIn(200)
  // FUNCTION //
  Task.list()
} else {
  $registerPage.hide()
  $listPage.hide()
  $headerLogoutGoogle.hide()
}