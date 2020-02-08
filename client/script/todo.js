const baseUrl = `http://localhost:3000`

$(document).ready(function () {
    $("#addTodo").submit(function (e) {
        e.preventDefault()
        const title = $('#title').val()
        const description = $('#description').val()
        const dueDate = $('#dueDate').val()
        createTodo(title, dueDate, description)
    })

    $("#myTodo").on("click", function (e) {
        e.preventDefault()
        allTodo()
    })

})

function createTodo(title, due_date, description) {
    $.ajax({
        url: `${baseUrl}/todos`,
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
        .done(() => {
            checkLogin()
            allTodo()
            document.getElementById("addTodo").reset()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function allTodo() {
    $.ajax({
        url: `${baseUrl}/todos`,
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            checkLogin()
            viewTodos(response)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function doneTodo(id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: "PUT",
        data: {
            status: "completed"
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            allTodo()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function backTodo(id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: "PUT",
        data: {
            status: "not complete"
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            allTodo()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function deleteTodo(id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        method: "DELETE",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            allTodo()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function getTodo(id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
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
    $.ajax({
        url: `${baseUrl}/todos/${idTodo}`,
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
            allTodo()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}