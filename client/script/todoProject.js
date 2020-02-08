function showTodoProject(projectId) {
    $.ajax({
        url: `${baseUrl}/projectTodos/${projectId}`,
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            checkLogin()
            $("#projectIdTodo").val(`${response.id}`)
            viewTodoOnProject(response)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function createTodoProject(projectId, title, due_date, description) {
    $.ajax({
        url: `${baseUrl}/projectTodos/${projectId}`,
        method: "POST",
        data: {
            title,
            description,
            due_date
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((res) => {
            checkLogin()
            showTodoProject(res.ProjectId)
            document.getElementById("addTodoProject").reset()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function doneProjectTodo(id, projectId) {
    $.ajax({
        url: `${baseUrl}/projectTodos/${projectId}/${id}`,
        method: "PUT",
        data: {
            status: "completed"
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((res) => {
            checkLogin()
            showTodoProject(res.ProjectId)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function backProjectTodo(id, projectId) {
    $.ajax({
        url: `${baseUrl}/projectTodos/${projectId}/${id}`,
        method: "PUT",
        data: {
            status: "not complete"
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((res) => {
            checkLogin()
            showTodoProject(res.ProjectId)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function deleteProjectTodo(id, projectId) {
    const idProject = projectId
    $.ajax({
        url: `${baseUrl}/projectTodos/${projectId}/${id}`,
        method: "DELETE",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            showTodoProject(idProject)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function getProjectTodo(id, projectId) {
    const idProject = projectId
    $.ajax({
        url: `${baseUrl}/projectTodos/${projectId}/${id}`,
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            $("#idTodo").val(`${response.id}`)
            $("#titleUpdate").val(`${response.title}`)
            $("#descriptionUpdate").val(`${response.description}`)
            $("#dueDateUpdate").val(`${response.due_date}`)
            $("#idProjectUpdate").val(`${idProject}`)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function updateTodo() {
    const idTodo = $("#idTodo").val()
    const title = $('#titleUpdate').val()
    const description = $('#descriptionUpdate').val()
    const due_date = $('#dueDateUpdate').val()
    const idProjectUpdate = $('#idProjectUpdate').val()
    $.ajax({
        url: `${baseUrl}/projectTodos/${idProjectUpdate}/${idTodo}`,
        method: "PUT",
        data: {
            title,
            description,
            due_date
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            showTodoProject(idProjectUpdate)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}