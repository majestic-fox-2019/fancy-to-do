const url = 'http://localhost:3000';

$(document).ready(function() {
    if(localStorage.token) {
        $('#landingPage').show()

        $('#registerForm').hide()
        $('#loginForm').hide()
        $('#messageForm').hide()
        $('#projectPage').hide()
        $('#containerLoginRegister').hide()
        $('#addTodoPage').hide()
        $('#editTodoPage').hide()
        $('#addProjectPage').hide()
        $('#editProjectPage').hide()
        $('#todoProject').hide()
        $('#detailProject').hide()
        $('#listTodoProject').hide()
        getUser()
        listTodo()
    } else {
        $('#containerLoginRegister').show()
        $('#registerForm').show()
        $('#loginForm').hide()
        $('#messageForm').hide()
        $('#landingPage').hide()
        $('#projectPage').hide()
        $('#detailProject').hide()
        $('#listTodoProject').hide()
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
        $('#addTodoPage').hide()
        $('#editTodoPage').hide()
        $('#projectPage').show()
        $('#contentProjectPage').show()
        $('#addProjectPage').hide()
        $('#editProjectPage').hide()
        $('#todoProject').hide()
        $('#detailProject').hide()
        $('#listTodoProject').hide()
        listProject()
    })

    $('#navTodo').click(function(e) {
        e.preventDefault()
        $('#todoPage').show()
        $('#contentTodoPage').show()
        $('#addTodoPage').hide()
        $('#editTodoPage').hide()
        $('#projectPage').hide()
        $('#contentProjectPage').show()
        $('#addProjectPage').hide()
        $('#editProjectPage').hide()
        $('#todoProject').hide()
        $('#detailProject').hide()
        $('#listTodoProject').hide()
        listTodo()
    })
    $('#iconAddTodo').click(function(e) {
        e.preventDefault()
        $('#addTodoPage').show()
        $('#editTodoPage').hide()
        $('#contentTodoPage').hide()
    })

    $('#addTodo').click(function(e) {
        e.preventDefault()
        addTodo()
    })

    $('#cancelTodo').click(function(e) {
        e.preventDefault()
        $('#todoPage').show()
        $('#contentTodoPage').show()
        $('#addTodoPage').hide()
        $('#editTodoPage').hide()
        $('#projectPage').hide()
        listTodo()
    })
    $('#saveTodo').click(function(e) {
        e.preventDefault()
        saveTodo()
    })

    $('#iconAddProject').click(function(e) {
        e.preventDefault()
        $('#addProjectPage').show()
        $('#editProjectPage').hide()
        $('#contentProjectPage').hide()
    })
    $('#addProject').click(function(e) {
        e.preventDefault()
        addProject()
    })
    $('#editProject').click(function(e) {
        e.preventDefault()
        saveProject()
    })
    $('#addUserToProject-save').click(function(e) {
        e.preventDefault()
        addUserTodoProject()
    })
    $('#listTodoProject-add').click(function(e) {
        e.preventDefault()
        showAddTodoProject()
    })
    $(document).on('click', `#cancelTodoProject`, function(e) {
        e.preventDefault()
        listTodoProject()
    })
    $(document).on('click', `#addTodoProject-btn`, function(e) {
        e.preventDefault()
        addTodoProject()
    })
    
})
// document ready

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
            listTodo()
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
            listTodo()
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

function googleSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: `${url}/googlesignin`,
        method: 'POST',
        data: {
            id_token: id_token
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
            listTodo()
            $('#addTodoPage').hide()
            $('#editTodoPage').hide()
            $('#addProjectPage').hide()
            $('#editProjectPage').hide()
            $('#contentProjectPage').hide()
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
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
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
            $('#contentProjectPage').empty()
            response.forEach(element => {
                $('#contentProjectPage').append(`
                    <div class="card col-3 mr-3 mb-3 border-info" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.Project.name}</h5>
                            <p class="card-text">${element.Project.name}</p>
                        </div>
                        <div class="card-footer bg-transparent">
                            <a href="" class="card-link" id="editProject${element.ProjectId}">Edit</a>
                            <a href="" class="card-link" id="delProject${element.ProjectId}">Delete</a>
                            <a href="" class="card-link" id="detailProject${element.ProjectId}">{ detail }</a>
                       </div>
                    </div>
                `)
                $(document).on('click', `#delProject${element.ProjectId}`, function(e) {
                    e.preventDefault()
                    delProject(element.ProjectId)
                })
                $(document).on('click', `#editProject${element.ProjectId}`, function(e) {
                    e.preventDefault()
                    $('#todoPage').hide()
                    $('#addTodoPage').hide()
                    $('#editTodoPage').hide()
                    $('#projectPage').show()
                    $('#contentProjectPage').hide()
                    $('#addProjectPage').hide()
                    $('#editProjectPage').show()
                    
                    $('#editProjectId').val(element.Project.id)
                    $('#editName').val(element.Project.name)
                })
                $(document).on('click', `#detailProject${element.ProjectId}`, function(e) {
                    e.preventDefault()
                    $('#todoPage').hide()
                    $('#addTodoPage').hide()
                    $('#editTodoPage').hide()
                    $('#projectPage').hide()
                    $('#contentProjectPage').hide()
                    $('#addProjectPage').hide()
                    $('#editProjectPage').hide()
                    $('#detailProject').show()
                    $('#listTodoProject').show()

                    $('#detailProjectID-id').val(element.Project.id)
                    $('#detailProjectID-name').val(element.Project.name)
                    listUserTodoProject()
                    listTodoProject()
                })
            })
        },
        error: function(err) {
            $('#contentTodoPage').append(`
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
            $('#projectPage').hide()
            $('#contentTodoPage').empty()
            response.forEach(element => {
                $('#contentTodoPage').append(`
                    <div class="card col-3 mr-3 mb-3 border-success" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.description}</p>
                            <p class="card-text">${element.status}</p>
                            <p class="card-text">${element.dueDate}</p>
                        </div>
                        <div class="card-footer bg-transparent">
                            <a href="" class="card-link" id="editTodo${element.id}">Edit</a>
                            <a href="" class="card-link" id="delTodo${element.id}">Delete</a>
                       </div>
                    </div>
                `)
                $(document).on('click', `#delTodo${element.id}`, function() {
                    delTodo(element.id)
                })
                $(document).on('click', `#editTodo${element.id}`, function(e) {
                    e.preventDefault()
                    $('#addTodoPage').hide()
                    $('#contentTodoPage').hide()
                    $('#editTodoPage').show()

                    $('#editID').val(element.id)
                    $('#editTitle').val(element.title)
                    $('#editDescription').val(element.description)
                    $('#editStatus').val(element.status)
                    $('#editDueDate').val(element.dueDate)
                })

            })
        },
        error: function(err) {
            console.log('error :', err)
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
            $('#todoPage').show()
            $('#contentTodoPage').show()
            $('#addTodoPage').hide()
            $('#editTodoPage').hide()
            $('#projectPage').hide()
            listTodo()
        },
        error: function(err) {
            console.log('error :', err)
        }
    })
}

function delTodo(id) {
    event.preventDefault()
    $.ajax({
        url: `${url}/todos/${id}`,
        type: 'DELETE',
        data: {
            id
        },
        headers: { token: localStorage.getItem('token') },
        success: function(response) {
            listTodo()
        },
        error: function(err) {
            console.log('error :', err)
        }
    })
}

function saveTodo() {
    const id = $('#editID').val()
    event.preventDefault()
    $.ajax({
        url: `${url}/todos/${id}`,
        type: 'PUT',
        data: {
            title: $('#editTitle').val(),
            description: $('#editDescription').val(),
            status: $('#editStatus').val(),
            dueDate: $('#editDueDate').val(),
        },
        headers: { token: localStorage.getItem('token') },
        success: function(response) {
            $("#editTodoForm")[0].reset() //clear input form
            $('#todoPage').show()
            $('#contentTodoPage').show()
            $('#addTodoPage').hide()
            $('#editTodoPage').hide()
            $('#projectPage').hide()
            listTodo()
        },
        error: function(err) {
            console.log('error :', err)
        }
    })
}

function addProject() {
    $.ajax({
        url: `${url}/projects`,
        type: 'POST',
        headers: { token: localStorage.getItem('token') },
        data: {
            name: $('#addName').val(),
        },
        success: function(response) {
            $("#addProjectForm")[0].reset() //clear input form
            $('#todoPage').hide()
            $('#addTodoPage').hide()
            $('#editTodoPage').hide()
            $('#projectPage').show()
            $('#contentProjectPage').show()
            $('#addProjectPage').hide()
            $('#editProjectPage').hide()
            listProject()
            },
        error: function(err) {
            console.log('error :', err)
        }
    })
}
function delProject(id) {
    event.preventDefault()
    $.ajax({
        url: `${url}/projects/${id}`,
        type: 'DELETE',
        headers: { token: localStorage.getItem('token') },
        success: function(response) {
            listProject()
        },
        error: function(err) {
            console.log('error :', err)
        }
    })
}
function saveProject() {
    const id = $('#editProjectId').val()
    event.preventDefault()
    $.ajax({
        url: `${url}/projects/${id}`,
        type: 'PUT',
        data: {
            name: $('#editName').val(),
        },
        headers: { token: localStorage.getItem('token') },
        success: function(response) {
            $("#editProjectForm")[0].reset() //clear input form
            $('#todoPage').hide()
            $('#addTodoPage').hide()
            $('#editTodoPage').hide()
            $('#projectPage').show()
            $('#contentProjectPage').show()
            $('#addProjectPage').hide()
            $('#editProjectPage').hide()
            listProject()
        },
        error: function(err) {
            console.log('error :', err)
        }
    })
}

function listUserTodoProject() {
    const id = $('#detailProjectID-id').val()
    event.preventDefault()
    $.ajax({
        url: `${url}/projects/${id}/users`,
        type: 'GET',
        headers: { token: localStorage.getItem('token') },
        success: function(response) {
            $('#detailProjectUser-body').empty()
            response.forEach(element => {
                $('#detailProjectUser-body').append(`
                    <h4>${element.User.email}</h4>
                `)
            })
        },
        error: function(err) {
            console.log('error :', err)
        }
    })
}

function addUserTodoProject() {
    const id = $('#detailProjectID-id').val()
    event.preventDefault()
    $.ajax({
        url: `${url}/projects/${id}/user`,
        type: 'POST',
        headers: { token: localStorage.getItem('token') },
        data: {
            email: $('#addUserToProject-email').val()
        },
        success: function(response) {
            listUserTodoProject()
        },
        error: function(error) {
            console.log('error :', err)
        }
    })
}

function listTodoProject() {
    const id = $('#detailProjectID-id').val()
    event.preventDefault()
    $.ajax({
        url: `${url}/projects/${id}/todos`,
        type: 'GET',
        headers: { token: localStorage.getItem('token') },
        success: function(response) {
            $('#listTodoProject-body').empty()
            response[0].TodoProjects.forEach(element => {
                $('#listTodoProject-body').append(`
                    <div class="card col-3 ml-3 mt-3 border-success" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.description}</p>
                            <p class="card-text">${element.status}</p>
                            <p class="card-text">${element.dueDate}</p>
                        </div>
                        <div class="card-footer bg-transparent">
                            <a href="" class="card-link" id="editTodoProject${element.id}">Edit</a>
                            <a href="" class="card-link" id="delTodoProject${element.id}">Delete</a>
                        </div>
                    </div>
                `)
                $(document).on('click', `#delTodoProject${element.id}`, function() {
                    deleteTodoProject(element.id)
                })
                $(document).on('click', `#editTodoProject${element.id}`, function(e) {
                    e.preventDefault()
                    $('#listTodoProject-body').empty()
                    $('#listTodoProject-body').append(`
                        <form class="container col-7"id="editTodoProjectForm">
                            <h3>Edit Todo Project</h3>
                            <br>
                            <input type="hidden" class="form-control mb-2" placeholder="ID" id="editTodoProjectID">
                            <input type="text" class="form-control mb-2" placeholder="Title" id="editTodoProjectTitle">
                            <textarea class="form-control mb-2" name="addDescription" id="editTodoProjectDescription" rows="3" placeholder="Description"></textarea>
                            <input type="text" class="form-control mb-2" placeholder="Status" id="editTodoProjectStatus">
                            <input type="date" class="form-control mb-2" placeholder="Due Date" id="editTodoProjectDueDate">
                            
                            <button type="button" name="saveEditTodoProject" id="saveEditTodoProject${element.id}" class="btn btn-warning btn-md">Save</button>
                            <button type="button" name="cancelEditTodoProject" id="cancelEditTodoProject" class="btn btn-info btn-md">Cancel</button>
                        </form>
                    `)
                    $('#editTodoProjectID').val(element.id)
                    $('#editTodoProjectTitle').val(element.title)
                    $('#editTodoProjectDescription').val(element.description)
                    $('#editTodoProjectStatus').val(element.status)
                    $('#editTodoProjectDueDate').val(element.dueDate)

                    $(document).on('click', `#saveEditTodoProject${element.id}`, function() {
                        updateTodoProject(element.id)
                    })
                    $(document).on('click', `#cancelEditTodoProject`, function() {
                        listTodoProject()
                    })
                })
            })
        },
        error: function(err) {
            console.log('error :', err)
        }
    })
}

function showAddTodoProject() {
    $('#listTodoProject-body').empty()
    $('#listTodoProject-body').append(`
        <div id="todoProject" class="container">
            <form class="container" id="addTodoProjectForm">
                <h3>Add Todo Project</h3>
                <br>
                <div class="row-fluid">
                    <input type="hidden" class="form-control" placeholder="ProjectId" id="addTodoProjectId">
                    <input type="text" class="form-control col-5 mr-2 mb-2" placeholder="Title" id="addTitleTodoProject">
                    <textarea class="form-control col-5 mr-2 mb-2" name="addDescription" id="addDescriptionTodoProject" rows="2" placeholder="Description"></textarea>
                    <input type="date" class="form-control col-3 mr-2 mb-2" placeholder="Due Date" id="addDueDateTodoProject">
                </div>
                <button type="button" name="addTodoProject" id="addTodoProject-btn" class="btn btn-warning btn-md">Save</button>
                <button type="button" name="cancelTodoProject" id="cancelTodoProject" class="btn btn-secondary btn-md">Cancel</button>
            </form>
        </div>
    `)

}

function addTodoProject() {
    const id = $('#detailProjectID-id').val()
    event.preventDefault()
    $.ajax({
        url: `${url}/projects/${id}/todo`,
        type: 'POST',
        headers: { token: localStorage.getItem('token') },
        data: {
            title: $('#addTitleTodoProject').val(),
            description: $('#addDescriptionTodoProject').val(),
            dueDate: $('#addDueDateTodoProject').val(),
        },
        success: function(response) {
            listTodoProject()
        },
        error: function(error) {
            console.log('error :', err)
        }
    })
}

function deleteTodoProject(idtodo) {
    const id = $('#detailProjectID-id').val()
    event.preventDefault()
    $.ajax({
        url: `${url}/projects/${id}/todo/${idtodo}`,
        type: 'DELETE',
        headers: { token: localStorage.getItem('token') },
        success: function(response) {
            listTodoProject()
        },
        error: function(err) {
            console.log('error :', err)
        }
    })
}

function updateTodoProject(idtodo) {
    const id = $('#detailProjectID-id').val()
    event.preventDefault()
    $.ajax({
        url: `${url}/projects/${id}/todo/${idtodo}`,
        type: 'PUT',
        data: {
            title: $('#editTodoProjectTitle').val(),
            description: $('#editTodoProjectDescription').val(),
            dueDate:$('#editTodoProjectDueDate').val(),
            status: $('#editTodoProjectStatus').val(),
        },
        headers: { token: localStorage.getItem('token') },
        success: function(response) {
            listTodoProject()
        },
        error: function(err) {
            console.log('error :', err)
        }
    })
}