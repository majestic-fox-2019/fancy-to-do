function viewTodos(response) {
    $('#completed').empty()
    $('#todo').empty()
    response.forEach(data => {
        if (data.status === "not complete") {
            $('#todo').append(`<div class="todo-task">
                            <div class="task-header">${data.title}</div>
                            <div class="task-description">${data.description}</div>
                            <div class="task-date">${formatDate(data.due_date)}</div>
                            <div style="display: flex;">
                                <input onclick="doneTodo('${data.id}')" type="button" class="btn btn-dark btn-sm" value="Done" />
                                <input type="button" onclick="getTodo('${data.id}')" id="goEditTask" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#updateTodo" value="Edit" />
                                <input onclick="deleteTodo('${data.id}')" type="button" class="btn btn-dark btn-sm" value="Delete" />
                            </div>
                        </div>`)
        } else {
            $('#completed').append(`<div class="todo-task">
                            <div class="task-header">${data.title}</div>
                            <div class="task-description">${data.description}</div>
                            <div class="task-date">${formatDate(data.due_date)}</div>
                            <div style="display: flex;">
                                <input onclick="backTodo('${data.id}')" type="button" class="btn btn-dark btn-sm" value="Back" />
                                <input onclick="deleteTodo('${data.id}')" type="button" class="btn btn-dark btn-sm" value="Delete" />
                            </div>
                        </div>`)
        }
    })
}

function formatDate(date) {
    let current_datetime = date
    return moment(current_datetime).utc().format('DD/MM/YYYY')
}

// function viewEdit(response) {
//     $("#editTask").fadeOut('slow')
//     $("#addTask").fadeIn('slow')
// }