let $loginForm = $('.loginForm')
let $registerForm = $('.registerForm')
let $tableTodo = $('.add')
let $register = $('#register')
let $addTodo = $('#addTodo')
let $updateForm = $('.updateForm')
let $login = $('#login')
let $signOut = $('.signOut')
let $gSignIn = $('.g-signin2')
let $navbar = $('.navigation')

if (!localStorage.getItem("token")) {
  $registerForm.show()
  $loginForm.hide()
  $tableTodo.hide()
  $signOut.hide()
  $updateForm.hide()
  $navbar.hide()
} else {
  $loginForm.hide()
  $registerForm.hide()
  $signOut.show()
  $navbar.show()
  $tableTodo.show()
  $updateForm.show()
  TodoApps.showTodoList()
}


let redirectToLogin = $('.loginLink')
redirectToLogin.on('click', function (e) {
  $loginForm.show()
  $registerForm.hide()
})


// Register new User
$register.on('submit', (e) => {
  e.preventDefault()
  let $name = $("#nameRegister").val()
  let $email = $('#emailRegister').val()
  let $username = $('#usernameRegister').val()
  let $password = $('#passwordRegister').val()

  const user = {
    name: $name,
    email: $email,
    username: $username,
    password: $password
  }
  User.register(user)
})


// Login User
$login.on('submit', (e) => {
  e.preventDefault()
  let $email = $('#emailLogin').val()
  let $password = $('#passwordLogin').val()

  const user = {
    email: $email,
    password: $password
  }
  User.login(user)
})

// Signin Google
function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    method: 'POST',
    url: `${server}/login/google`,
    data: { id_token }
  })
    .done(token => {
      localStorage.setItem('token', token)
      $tableTodo.show()
      $loginForm.hide()
      $navbar.show()
      TodoApps.showTodoList()
    })
    .fail(function (result) {
      console.log(result)
    })
}

// Signout
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.removeItem('token')
    $navbar.hide()
    $registerForm.show()
    $tableTodo.hide()
  })
}


// add new Todo list
$addTodo.on('submit', function (e) {
  e.preventDefault()
  let title = $("#title").val()
  let description = $("#description").val()
  let status = $("#status").val()
  let due_date = $("#duedate").val()

  const addNew = { title, description, status, due_date }

  TodoApps.addTodo(addNew)
  Swal.fire({
    icon: 'success',
    title: 'Added to your todolist!',
    showConfirmButton: false,
    timer: 1500
  })
})


// Button click (delete or update)
$(this).click(function (e) {
  if (document.activeElement.id === 'deletetodo') {
    e.preventDefault()
    TodoApps.deleteTodo(document.activeElement.href)
  }
  else if (document.activeElement.id === 'updatetodo') {
    e.preventDefault()
    console.log(document.activeElement.href, "yang mau di update")
    TodoApps.findTodoById(document.activeElement.href)
  }
})


// update Todo list
let $update = $('#updateTodo')
$update.on('submit', function (e) {
  e.preventDefault()
  let id = $("#edit_id").val()
  let title = $("#titleUpdate").val()
  let description = $("#descriptionUpdate").val()
  let status = $("#statusUpdate").val()
  let due_date = $("#duedateUpdate").val()

  const updateData = { title, description, status, due_date }

  TodoApps.updateTodo(id, updateData)
  Swal.fire({
    icon: 'success',
    title: 'Successfully update your todolist!',
    showConfirmButton: false,
    timer: 1500
  })
})
