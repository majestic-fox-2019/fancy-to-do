class Form {
    
  static registerForm(e){
    e.preventDefault()
    $loginPage.fadeOut(1000)
    $registerPage.fadeIn(1000)
  }

  static loginForm(e){
    e.preventDefault()
    $loginPage.fadeIn(1000)
    $registerPage.fadeOut(1000)
  }

}