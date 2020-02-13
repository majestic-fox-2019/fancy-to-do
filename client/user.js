class User {
  static register(user) {
    $.ajax({
      method: 'POST',
      url: `${server}/register`,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(user),

    })
      .done(function (data) {
        $registerForm.hide()
        $loginForm.show()
        console.log(data)
      })
      .fail(function (data) {
        let errors = data.responseJSON
        console.log(errors)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: Object.values(errors).join('\n'),
        })
      })
  }

  static login(user) {
    $.ajax({
      method: 'POST',
      url: `${server}/login`,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(user)
    })
      .done(function (data) {
        console.log(data, '< masuk nih')
        localStorage.setItem("token", data)
        $signOut.show()
        $tableTodo.show()
        $loginForm.hide()
        $navbar.show()
        TodoApps.showTodoList()
      })
      .fail(function (data) {
        console.log(data)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      })
  }

}