

$('#createProject').on('submit', function (event) {
    event.preventDefault()
    const name = $('#project_name').val()
    createProjectController(name)
})

function createProjectController(name) {
    $.ajax({
        method: 'post',
        url: `${BASE_URL}projects`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name
        }
    })
        .done(() => {
            myProjectTodo(projectId)
            $('#exampleModalLong').modal('hide')
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

function myProject() {
    $.ajax({
        method: 'get',
        url: `${BASE_URL}projects`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(datas => {
            $("#myProject").empty()
            $('#myFriends').empty()
            datas.forEach((element, index) => {
                $("#myProject").append(`
                <div class="col mt-3 text-center" style="border-bottom: black 1px solid;">
                    <a href="" onclick="myProjectTodo(${element.id}, 1)" >
                        <h2>${element.name}</h2>
                    </a>
                </div>
                `)
            });
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}



function myProjectTodo(id, check) {
    if (check === 1) {
        event.preventDefault()
    }
    $('#inviteMember').show()
    $('#buttonAddTodo').show()
    $('#inviteButtons').show()
    $('#leaveProject').show()
    console.log('masuk')
    $.ajax({
        method: 'get',
        url: `${BASE_URL}projects/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todo => {
            projectId = todo.id
            $('#todoProject').empty()
            $('#doingProject').empty()
            $('#doneProject').empty()
            $('#myFriends').empty()
            todo.Users.forEach(el => {
                $('#myFriends').append(`
                    <div class="col mt-3 text-center" style="border-bottom: black 1px solid;">
                    <p>${el.email}<p>
                </div>
                    `
                )
            })
            todo.Todos.forEach(element => {
                if (element.status === 'todo') {
                    $('#todoProject').append(
                        `
                        <div class="d-flex flex-column mb-3" style="border: solid 2px black; border-radius: 10px;">
                            <div class="pl-4 pt-2 pb-2">
                                <h1>${element.title}</h1>
                                <h3>${element.description}</h3>
                                <h4>${moment(element.due_date).format("MMM Do YYYY")}</h4>
                            </div>
                            <div class="d-flex justify-content-around pb-3">
                                <div>
                                <button type="button" 
                                onclick="findTodo(${element.id})"
                                class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                                Update
                            </button>
                                    <button type="button" onclick="deleteTodo(${element.id})" class="btn btn-danger">Delete</button>
                                </div>
                                <div>
                                    <button type="button" onclick="changeStatusUp(${element.id})" class="btn btn-success">Doing</button>
                                </div>
                            </div>
                        </div>
                        `
                    )
                } else if (element.status === 'doing') {
                    $('#doingProject').append(
                        `<div class="d-flex flex-column mb-3" style="border: solid 2px black; border-radius: 10px;">
                        <div class="pl-4 pt-2 pb-2">
                            <h1>${element.title}</h1>
                            <h3>${element.description}</h3>
                            <h4>${moment(element.due_date).format("MMM Do YYYY")}</h4>
                        </div>
                        <div class="d-flex justify-content-around pb-3">
                            <div>
                                <button type="button" onclick="changeStatusDown(${element.id})" class="btn btn-success">Todo</button>
                            </div>
                            <div>
                            <button type="button"
                            onclick="findTodo(${element.id})"
                             class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                            Update
                          </button>
                                <button type="button" onclick="deleteTodo(${element.id})" class="btn btn-danger">Delete</button>
                            </div>
                            <div>
                                <button type="button" onclick="changeStatusUp(${element.id})" class="btn btn-success">Done</button>
                            </div>
                        </div>

                    </div>`
                    )
                } else {
                    $('#doneProject').append(
                        `<div class="d-flex flex-column mb-3" style="border: solid 2px black; border-radius: 10px;">
                        <div class="pl-4 pt-2 pb-2">
                            <h1>${element.title}</h1>
                            <h3>${element.description}</h3>
                            <h4>${moment(element.due_date).format("MMM Do YYYY")}</h4>
                        </div>
                        <div class="d-flex justify-content-around pb-3">
                            <div>
                                <button type="button" onclick="changeStatusDown(${element.id})" class="btn btn-success">Doing</button>
                            </div>
                            <div>
                            <button type="button" 
                            onclick="findTodo(${element.id})" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                            Update
                          </button>
                                <button type="button" onclick="deleteTodo(${element.id})" class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>`
                    )
                    $('#createProjectTodo').on('submit', function (event) {
                        event.preventDefault()
                        createTodoProjectController(projectId)
                    })
                }
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

function changeStatusDown(id) {
    $.ajax({
        method: 'patch',
        url: `${BASE_URL}todos/${id}/down`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todo => {
            fetchData()
            myProjectTodo(projectId)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

function changeStatusUp(id) {
    $.ajax({
        method: 'patch',
        url: `${BASE_URL}todos/${id}/up`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todo => {
            fetchData()
            myProjectTodo(projectId)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

$('#createProjectTodo').on('submit', function (event) {
    event.preventDefault()
    createTodoProjectController(projectId)
})

function createTodoProjectController(id) {
    let title = $('#project_title').val()
    let description = $('#project_description').val()
    let due_date = $('#project_due_date').val()
    $.ajax({
        method: 'post',
        url: `${BASE_URL}projects/${id}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title,
            description,
            due_date
        }
    })
        .done(data => {
            fetchData()
            $('#exampleModalLong1').modal('hide')
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

$('#inviteMember').on('submit', function (event) {
    event.preventDefault()
    inviteMemberToProject(projectId)
})

$('#leaveProject').on('click', function (event) {
    event.preventDefault()
    leave(projectId)
})

function leave(id) {
    $.ajax({
        method: 'delete',
        url: `${BASE_URL}projects/${id}/leave`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            $('#todoProject').empty()
            $('#doingProject').empty()
            $('#doneProject').empty()
            $('#myFriends').empty()
            fetchData()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}



function inviteMemberToProject(id) {
    let email = $('#emailForInvite').val()
    $.ajax({
        method: 'post',
        url: `${BASE_URL}projects/join`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            email,
            id
        }
    })
        .done(user => {
            fetchData()
            myProjectTodo(id)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}