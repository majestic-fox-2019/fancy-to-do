$(document).ready(function () {
    if(localStorage.getItem('token')){
        $('#Container').hide()
        getUserProjects()
        getUserTodos()
        // console.log(userProjects)
    } else {
        // $('#container').show()
        $('#Main').hide()
        $('#content-spinner').hide()
    }
    $('#action-items').hide()
    $('#registerForm').hide()
    $('#history-items').hide()
    $('#projectList').hide()
    $('#forTodos').hide()
    // $('#member-list').hide()
    // $('#projectMembers').hide()
    $(document).on('click', '#registerButton', function (e) {
        e.preventDefault()
        $('#loginForm').slideToggle()
        $('#registerForm').slideToggle()
    })

    Translation.generateSelectLanguage()

    $(document).on('click', '#loginButton', function(e) {
        e.preventDefault()
        $('#registerForm').slideToggle()
        $('#loginForm').slideToggle()
    })
})
