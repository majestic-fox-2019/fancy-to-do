var $loginOrRegister = $('#loginOrRegister')

$loginOrRegister.on('submit','#loginForm',function(e){
  clearMessage()
  e.preventDefault()
  var email = $loginOrRegister.find('#emailLogin').val()
  var password = $loginOrRegister.find('#passwordLogin').val()
  $.ajax(`${urlBase}login`,{
    method : "POST",
    data : {
      email,
      password
    }
  })
  .done(function(data){
    localStorage.setItem("token", data.token)
    localStorage.setItem("email", email)
    checkToken()
  })
  .fail(function(err){
    var responseJSON = err.responseJSON
    makeMessage(responseJSON.message || "Email/Password wrong","danger")
  })
})


$loginOrRegister.on('submit','#registerForm',function(e){
  $loginOrRegister.find('.invalid-feedback').remove()
  clearMessage()
  e.preventDefault()
  var email = $loginOrRegister.find('#emailLogin').val()
  var password = $loginOrRegister.find('#passwordLogin').val()
  $.ajax(`${urlBase}register`,{
    method : "POST",
    data : {
      email,
      password
    }
  })
  .done(function(data){
    makeMessage("Succesfully Register")
  })
  .fail(function(err){
    var responseJSON = err.responseJSON
    makeMessage(responseJSON.message || "Email/Password wrong","danger")
  })
})

function logout(){
  GoogleAuth.signOut()
  localStorage.clear()
  checkToken()
}

function socialLogin(token){
  if(token){
    $.ajax(`${urlBase}google/login`,{
      method : "POST",
      data : {
        token
      }
    })
    .done(function(data){
      localStorage.setItem("token", data.token)
      checkToken()
    })
    .fail(function(err){
      makeMessage('Something Wrong',"danger")
    })
  }
}

