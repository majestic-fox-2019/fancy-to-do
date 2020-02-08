//event login
$formLogin.submit(function (e) {
    e.preventDefault()
    const $email = $('#email').val()
    const $password = $('#password').val()
    User.loginHandler($email, $password)
})
//login by google
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    User.loginByGoogle(id_token)
}

//event register
$formRegister.submit(function (e) {
    e.preventDefault()
    clearValidation($formRegister)
    const $name = $('#name_register').val()
    const $email = $('#email_register').val()
    const $password = $('#password_register').val()
    User.registerHandler($name, $email, $password)
})

//event logout
$btnLogout.click(function (e) {
    e.preventDefault()
    User.logoutHandler()
})

//event search
$titles.keyup(function () {
    Todo.getTodoByTitle($titles.val())
})

//event add 
$formAddTodo.submit(function (e) {
    e.preventDefault()
    clearValidation($('#add-todo'))
    Todo.addTodo($title.val(), $description.val(), $due_date.val())
})

//event delete and get single data for update
$(this).click(function (e) {
    if (document.activeElement.id === 'deletetodo') {
        e.preventDefault()
        Todo.deleteTodo(document.activeElement.href)
    } else if (document.activeElement.id === 'updatetodo') {
        e.preventDefault()
        clearField($(`#${document.activeElement.id}`))
        clearValidation($formUpdateTodo)
        Todo.getSingleTodo(document.activeElement.href)
    }
})

$formUpdateTodo.submit(function (e) {
    e.preventDefault()
    Todo.updateTodo($title_edit.val(), $description_edit.val(), $status_edit.val(), $due_date_edit.val(), $id.val())
})