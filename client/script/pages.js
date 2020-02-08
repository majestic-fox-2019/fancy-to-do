//pages list
$loginRegisterPage = $('#login-page')
$mainPage = $('#main-page')

if (localStorage.token) {
    $loginRegisterPage.hide()
    $mainPage.show()
    $todoUser.html(`<i class="fa fa-file-text-o" aria-hidden="true"></i> &nbsp;<b>${localStorage.name}</b> To-do`)
    Todo.getTodo()
} else {
    $loginRegisterPage.show()
    $mainPage.hide()
}