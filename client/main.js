const url = 'http://localhost:3000';

$(document).ready(function() {
    if(localStorage.token) {
        $('#registerForm').hide()
        $('#loginForm').hide()
        $('#messageForm').hide()
        $('#landingPage').show()
        getUser()
        $('#containerLoginRegister').hide()
    } else {
        $('#containerLoginRegister').show()
        $('#registerForm').show()
        $('#loginForm').hide()
        $('#messageForm').hide()
        $('#landingPage').hide()
    }

    $('#gotoLogin').click(function(e) {
        e.preventDefault()
        gotoLogin();
    })

    $('#gotoRegister').click(function(e) {
        e.preventDefault()
        gotoRegister();
    })

    $('#register').click(function(e) {
        e.preventDefault()
        register()
    })

    $('#login').click(function(e) {
        e.preventDefault()
        login()
    })

    $('#navLogout').click(function(e) {
        e.preventDefault()
        logout()
    })

    $('#navProject').click(function(e) {
        e.preventDefault()
        $('#todoPage').hide()
        $('#projectPage').show()
        listProject()
    })

    $('#navTodo').click(function(e) {
        e.preventDefault()
        $('#todoPage').show()
        $('#projectPage').hide()
        listTodo()
    })

    $('#addTodo').click(function(e) {
        e.preventDefault()
        addTodo()
    })
})

function gotoRegister() {
    $('#registerForm').show()
    $('#loginForm').hide()
    $('#messageForm').empty()
    $('#messageForm').hide()
}

function gotoLogin() {
    $('#registerForm').hide()
    $('#loginForm').show()
    $('#messageForm').empty()
    $('#messageForm').hide()
}

function register() {
    $.ajax({
        url:`${url}/register`,
        type:'POST',
        data: {
            name: $('#inputNameRegister').val(),
            email: $('#inputEmailRegister').val(),
            password: $('#inputPasswordRegister').val(),
        },
        success: function(response){
            $('#messageForm').empty()
            $('#messageForm').append(`
                <p>Success Register:</p>
                <p>${response.email}</p>
            `)
            $('#messageForm').show()
            $("#registerForm")[0].reset();
            localStorage.setItem('token', response.token);
            $('#landingPage').show()
            $('#navUser').empty()
            $('#navUser').append(`<p>${response.email}</p>`)
            $('#containerLoginRegister').hide()
        },
        error: function(err) {
            $('#messageForm').empty()
            err.responseJSON.error.forEach(element => {
                $('#messageForm').append(`
                <p>${element}</p>
            `)
            })
            $('#messageForm').show()
            $("#registerForm")[0].reset();
            $('#landingPage').hide()
        },
    })
}

function login() {
    $.ajax({
        url:`${url}/login`,
        type:'POST',
        data: {
            email: $('#inputEmailLogin').val(),
            password: $('#inputPasswordLogin').val(),
        },
        success: function(response){
            $('#messageForm').empty()
            $('#messageForm').append(`
                <p>Success Login:</p>
                <p>${response.email}</p>
            `)
            $('#messageForm').show()
            $("#loginForm")[0].reset();
            localStorage.setItem('token', response.token);
            $('#landingPage').show()
            $('#navUser').empty()
            $('#navUser').append(`<p>${response.email}</p>`)
            $('#containerLoginRegister').hide()
        },
        error: function(err) {
            $('#messageForm').empty()
            $('#messageForm').append(`
                <p>${err.responseJSON.error}</p>
            `)
            $('#messageForm').show()
            $("#loginForm")[0].reset(); //clear input form
            $('#landingPage').hide()
        },
    })
}

function getUser() {
    $.ajax({
        url: `${url}/user`,
        type: 'GET',
        headers: { token: localStorage.getItem('token')},
        success: function(response) {
            $('#navUser').empty()
            $('#navUser').append(`<p>${response.email}</p>`)
        },
        error: function(err) {
            logout()
        }
    })
}

function logout() {
    localStorage.removeItem('token')
    $('#containerLoginRegister').show()
    $('#registerForm').hide()
    $('#loginForm').show()
    $('#messageForm').hide()
    $('#landingPage').hide()

}

function listProject() {
    $.ajax({
        url: `${url}/projects`,
        type: 'GET',
        headers: { token: localStorage.getItem('token')},
        success: function(response) {
            $('#projectPage').empty()
            response.forEach(element => {
                $('#projectPage').append(`
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.Project.name}</h5>
                            <p class="card-text">${element.Project.name}</p>
                            <a href="" class="card-link">Edit</a>
                            <a href="" class="card-link">Delete</a>
                        </div>
                    </div>
                `)
            })
        },
        error: function(err) {
            $('#projectPage').append(`
                <p>${JSON.stringify(err)}</p>
            `)
        }
    })
}

function listTodo() {
    $.ajax({
        url: `${url}/todos`,
        type: 'GET',
        headers: { token: localStorage.getItem('token')},
        success: function(response) {
            $('#contentTodoPage').empty()
            response.forEach(element => {
                $('#contentTodoPage').append(`
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.description}</p>
                            <p class="card-text">${element.status}</p>
                            <p class="card-text">${element.dueDate}</p>
                            <a href="" class="card-link">Edit</a>
                            <a href="" class="card-link">Delete</a>
                        </div>
                    </div>
                `)
            })
        },
        error: function(err) {

        }
    })
}

function addTodo() {
    $.ajax({
        url: `${url}/todos`,
        type: 'POST',
        headers: { token: localStorage.getItem('token') },
        data: {
            title: $('#addTitle').val(),
            description: $('#addDescription').val(),
            dueDate: $('#addDueDate').val(),
        },
        success: function(response) {
            $("#addTodoForm")[0].reset() //clear input form
            listTodo()
        },
        error: {

        }
    })
}

