let baseUrl = "http://localhost:3000"
let idTodoForEdit
let idTodoForEditProject
$(window).on("load", function () {

    let token = localStorage.getItem("token")
    let username = localStorage.getItem("username")
    if (token) {
        $("#loginRegPage").hide()
        $("#errorMessage").hide()
        $("#myProjectsku").hide()
        $("#main").show()
        $("#UsernameButton").text(function () {
            return username
        })
        getMyTodos()
    } else {
        $("#errorMessage").hide()
        $("#main").hide()
        $("#loginRegPage").show()
    }
})

$(document).ready(function () {
    $("#login-tab").click(function () {
        $("#errorMessage").hide()
    })
    $("#Register-tab").click(function () {
        $("#errorMessage").hide()
    })
    $("#login").click(function () {
        let email = $("#emailLogin").val()
        let password = $("#passwordLogin").val()
        login(email, password)
    })
    $("#logout").click(function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
        logout()
    })
    $("#registerButton").click(function () {
        let email = $("#emailRegister").val()
        let password = $("#passwordRegister").val()
        let username = $("#usernameRegister").val()
        let confirmPassword = $("#confirmPassword").val()
        if (password !== confirmPassword) {
            $("#errorMessage").text("Password does not match")
            $("#errorMessage").show()
        } else {
            register(email, password, username)
        }
    })
    $("#createTodo").click(function () {
        let due_date = $("#dueDateModal").val()
        let title = $("#titleTodo").val()
        let description = $("#descriptionModal").val()
        let status = false
        createTodo(due_date, title, description, status)
    })
    $("#editThis").click(function () {
        let title = $("#titleEdit").val()
        let id = idTodoForEdit
        let statusAwal = $("#statusEdit").val()
        let status
        if (statusAwal == "Done") {
            status = true
        } else {
            status = false
        }
        let due_date = $("#dueDateEdit").val()
        let description = $("#descriptionEdit").val()
        editTodo(id, title, status, due_date, description)
    })
    $("#backToTodo").click(function () {
        $("#vanillaTodo").show()
        $("#myProjectsku").hide()
        getMyTodos()
    })
    $("#toProjects").click(function () {
        $("#vanillaTodo").hide()
        $("#myProjectsku").show()
        getMyProjects()
    })
    $("#createProject").click(function () {
        let name = $("#projectNameCreate").val()
        addProject(name)
    })
    $("#saveEditP").click(function () {
        let title = $("#titleEditTP").val()
        let id = idTodoForEditProject
        let statusAwal = $("#statusEditP").val()
        let status
        if (statusAwal == "Done") {
            status = true
        } else {
            status = false
        }
        let due_date = $("#dueDateEditP").val()
        let description = $("#descriptionEditP").val()
        editTodoProject(id, title, status, due_date, description)
    })

})


