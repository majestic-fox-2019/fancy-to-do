function viewTodos(response) {
    $('#completed').empty()
    $('#todo').empty()
    response.forEach(data => {
        if (data.status === "not complete") {
            $('#todo').append(`<div class="todo-task">
                            <div class="task-header">${data.title}</div>
                            <div class="task-description">${data.description}</div>
                            <div class="task-date">${formatDate(data.due_date)}</div>
                                <button data-toggle="tooltip" onclick="doneTodo('${data.id}')" data-placement="top" title="Done" class="btn btn-dark btn-sm">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button onclick="getTodo('${data.id}')" id="goEditTask" data-placement="top" title="Edit" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#updateTodo">
                                    <i class="far fa-edit"></i>
                                </button>
                                <button data-toggle="tooltip" onclick="deleteTodo('${data.id}')" data-placement="top" title="Trash" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                        </div>`)
        } else {
            $('#completed').append(`<div class="todo-task">
                            <div style="text-decoration: line-through;" class="task-header">${data.title}</div>
                            <div style="text-decoration: line-through;" class="task-description">${data.description}</div>
                            <div style="text-decoration: line-through;" class="task-date">${formatDate(data.due_date)}</div>
                                <button data-toggle="tooltip" onclick="backTodo('${data.id}')" data-placement="top" title="Back" class="btn btn-dark btn-sm">
                                    <i class="fas fa-undo"></i>
                                </button>
                                <button data-toggle="tooltip" onclick="deleteTodo('${data.id}')" data-placement="top" title="Trash" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                        </div>`)
        }
    })
}

function formatDate(date) {
    let current_datetime = date
    return moment(current_datetime).utc().format('DD/MM/YYYY')
}

function viewProject(response) {
    $('#project').empty()
    response.forEach(data => {
        $('#project').append(`<div class="project-task">
                            <div class="task-header">${data.nameProject}
                            </div>
                            <div>
                                <button data-toggle="tooltip" data-placement="top" title="Show Project Todos" onclick="showTodoProject('${data.id}')" id="getTodoProject" class="btn btn-dark btn-sm">
                                    <i class="far fa-eye"></i>
                                </button>
                                <button data-toggle="tooltip" data-placement="top" title="Show Members"  onclick="getMember('${data.id}')" id="getingMember" class="btn btn-dark btn-sm">
                                    <i class="fas fa-user-friends"></i>
                                </button>
                                <button data-toggle="tooltip" data-placement="top" title="Delete Project"  onclick="deleteProject('${data.id}')" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>`)
    })
}

function viewMember(response) {
    $('#member').empty()
    if (!response) {
        $('#member').empty()
    } else {
        $('#member').append(`
        <div style="display:flex; justify-content:center;">
        <h5>Project: ${response.nameProject}</h5>
        </div>
        `)
        response.Users.forEach(data => {
            $('#member').append(`<div class="project-task">
                                    <div class="task-header">${data.fullname}</div>
                                        <div>
                                            <button data-toggle="tooltip" data-placement="top" title="Delete Member" onclick="deleteMember('${data.id}', '${response.id}')" class="btn btn-danger btn-sm">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                </div>`)
        })
        $('#member').append(`<div style="display: flex; flex-flow: column-reverse;">
            <button data-placement="top" title="Add Member" type="button class="btn btn-dark btn-sm" data-toggle="modal" data-target="#addMember">
                <i class="fas fa-user-plus"></i>
            </button>
            <input type='hidden' id='projectId'/>
        </div>
        `)
    }
}

function viewTodoOnProject(response) {
    $('#todoProject').empty()
    $('#completeTodoProject').empty()
    response.Todos.forEach(data => {
        if (data.status === "not complete") {
            $('#todoProject').append(`<div class="todo-task">
                            <div class="task-header">${data.title}</div>
                            <div class="task-description">${data.description}</div>
                            <div class="task-date">${formatDate(data.due_date)}</div>
                                <button data-toggle="tooltip" onclick="doneProjectTodo('${data.id}', '${data.ProjectId}')" data-placement="top" title="Done" class="btn btn-dark btn-sm">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button onclick="getProjectTodo('${data.id}', '${data.ProjectId}')" id="goEditProjectTodo" data-placement="top" title="Edit" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#updateTodo">
                                    <i class="far fa-edit"></i>
                                </button>
                                <button data-toggle="tooltip" onclick="deleteProjectTodo('${data.id}', '${data.ProjectId}')" data-placement="top" title="Trash" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                        </div>`)
        } else {
            $('#completeTodoProject').append(`<div class="todo-task">
                            <div style="text-decoration: line-through;" class="task-header">${data.title}</div>
                            <div style="text-decoration: line-through;" class="task-description">${data.description}</div>
                            <div style="text-decoration: line-through;" class="task-date">${formatDate(data.due_date)}</div>
                                <button data-toggle="tooltip" onclick="backProjectTodo('${data.id}', '${data.ProjectId}')" data-placement="top" title="Back" class="btn btn-dark btn-sm">
                                    <i class="fas fa-undo"></i>
                                </button>
                                <button data-toggle="tooltip" onclick="deleteProjectTodo('${data.id}', '${data.ProjectId}')" data-placement="top" title="Trash" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                        </div>`)
        }
    })
}