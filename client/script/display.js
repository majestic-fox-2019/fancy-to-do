$(document).on('click', '#history-toggle', function (e) {
    e.preventDefault()
    $('#history-items').slideToggle()
})

$(document).on('click', '#project-toggler', function (e) {
    e.preventDefault()
    $('#projectList').slideToggle()
})

$(document).on('click', '#action-toggle', function (e) {
    e.preventDefault()
    $('#action-items').slideToggle()
})

$(document).on('click', '#yourPersonalTodo', function (e) {
    e.preventDefault()
    $('#forTodos').hide()
    getUserTodos()
})

function projectListDisplay(projects) {
    // console.log(projects)
    $('#for-user-projects').html('')
    projects.forEach(element => {
        $('#for-user-projects').append(`
        <div class="row justify-content-center menu-item" id="projectDetails-${element.Project.id}" style="border-bottom:black solid 1px;">
        <h1>${element.Project.name}</h1>
        </div>
        `)
        $(document).on('click', `#projectDetails-${element.Project.id}`, function(){
            // alert(element.Project.name)
            getProjectTodo(element.Project.id, element.Project.name)
            getProjectMembers(element.Project.id)
            $('#newProjectTodoId').val(element.Project.id)
            $('#newProjectTodoTitle').val(element.Project.name)
        })
    })
}

function projectMemberDisplay(members, projectId, owner){
    // console.log(projectId)
    let ownertemplate
    if(owner) {
        ownertemplate = `
        <button class="btn btn-dark btn-lg" id="delete-Project" style="width:50%;">Delete Group</button>
        `
        $(document).on('click', '#delete-Project', function(e) {
            e.preventDefault()
            deleteGroup(projectId)
        })
    } else {
        ownertemplate = `
        <button class="btn btn-dark btn-lg" id="leave-Project" style="width:50%;">Leave Group</button>
        `
        $(document).on('click', '#leave-Project', function(e) {
            e.preventDefault()
            leaveGroup(projectId)
        })
    }
    $('#for-project-members').html('')
    $('#for-project-members').append(`
    <div class="mb-3" style="display:flex;justify-content:center;">
    <button class="btn btn-light btn-lg" data-toggle="modal" data-target="#addMemberButton" style="width:50%;">Add Member</button>
    ${ownertemplate}
    </div>
    <div class="modal fade" id="addMemberButton" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document" style="color:black">
    <div class="modal-content">
      <div class="modal-body">
        <form>
          <center><h3 class="mb-3">Add New Member</h3></center>
          <div class="form-group">
            <label for="projectEmail">Email</label>
            <input type="text" class="form-control" id="projectEmail">
            <input type="hidden" id="addMemberProjectId" value="${projectId}">
            <small id="memberHelp" class="form-text text-muted">Please make sure you input the correct email</small>
          </div>
          <center>
          <button type="button" class="btn btn-primary mt-3" data-dismiss="modal" data-target="#addMemberButton" id="submitAddMember">Add Member</button>
        </center>
        </form>
      </div>
    </div>
  </div>
</div>
    `)
    members.forEach(element => {
        $('#for-project-members').append(`
        <div class="row justify-content-center"><h3>${element.userName} | ${element.email}</h3></div>
    `)
    })
}

function userTodosDisplay(status, todos, project) {
    if(status == 'Not Done'){
        status = 'Active'
    }
    let deleteButton
    let editId
    $('#forTodos').html('')
    $('#content-spinner').hide()
    if(!project){
        deleteButton = `delete-`
        editId = 'edit-'
        $('#forTodos').append(`
        <div class="row justify-content-center mb-5"><h1>Your ${status} Todo List<h1></div>
        `)
    } else {
        // let leaveButton
        deleteButton = `delete-project-todo-`
        editId = 'edit-project-todo'
        $('#forTodos').append(`
        <div class="row justify-content-center mb-1"><h1>Project ${project}'s Todo List<h1></div>
        <div class="row justify-content-center">
        <button type="button" class="btn btn-secondary btn-lg" style="font-size:1.5rem;width:50%;"data-toggle="modal"
        data-target="#addNewTodo" id="addNewProjectTodoButton"><i class="fas fa-plus"></i> Add New Project Todo</button>
        </div>
        `)
    }
    
    todos.forEach(element => {
        let button
        if(element.status == 'Not Done'){
            if(project){
                button = `<button type="button" class="btn btn-warning check-button" id="change-project-${element.id}" style="font-size:2rem;"><i class="far fa-square"></i></button>`
            }else{
                button = `<button type="button" class="btn btn-warning check-button" id="change-${element.id}" style="font-size:2rem;"><i class="far fa-square"></i></button>`
            }
        } else if (element.status == 'Finished'){
            if(project){
                button = `<button type="button" class="btn btn-success check-button" id="change-project-${element.id}" style="font-size:2rem;"><i class="fas fa-check"></i></button>`
            } else {
                button = `<button type="button" class="btn btn-success check-button" id="change-${element.id}" style="font-size:2rem;"><i class="fas fa-check"></i></button>`
            }
        }else {
            if(project){
                button = `<button type="button" class="btn btn-danger check-button" id="change-project-${element.id}" style="font-size:2rem;"><i class="far fa-dizzy"></i></button>`
            } else {
                button = `<button type="button" class="btn btn-danger check-button" id="change-${element.id}" style="font-size:2rem;"><i class="far fa-dizzy"></i></button>`
            }
        }
        $('#forTodos').append(`
                    <div class="row animated fadeInUp todo-item shadow my-4">
                    <div class="col-2 todo-check">
                    ${button}
                    </div>
                    <div class="col-10">
                    <div class="row justify-content-center">
                    <h4>${element.title} <sup><a href="#" data-toggle="modal" data-target="#addNewTodo" id="${editId}${element.id}"><i class="far fa-edit"></i></a></sup></h4>
                    <button type="button" id="${deleteButton}${element.id}" class="btn btn-danger closed"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="row pl-3 pt-2">
                    <p style="margin:0;font-weight: bold;">Due on: ${new Date(element.due_date).toDateString()}</p>
                    </div>
                    <div class="row pl-3">
                    <a data-toggle="modal" data-target="#detail-${element.id}" style="cursor:pointer;">see details</a>
                    </div>
                    </div>
                    </div>

                    <div class="modal fade" id="detail-${element.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">Due on: ${new Date(element.due_date).toDateString()}</h5>
      </div>
      <div class="modal-body">
        <h1>${element.title}</h1>
        <p>${element.description}</p>
      </div>
    </div>
  </div>
</div>
                `)
        $(document).on('click', `#change-project-${element.id}`, function(e) {
            e.preventDefault()
            switch (element.status) {
                case 'Not Done':
                    changeProjectTodoStatus(element.id, 'Finished')
                    break;
                default:
                    changeProjectTodoStatus(element.id, 'Not Done')
                    break;
            }
        })
        
        $(document).on('click', `#delete-project-todo-${element.id}`, function(e) {
            e.preventDefault()
            deleteProjectTodo(element.id)
        })

        $(document).on('click', `#edit-project-todo${element.id}`, function (e) {
            e.preventDefault()
            // alert(element.due_date)
            $('#todoTitle').val(`${element.title}`)
            $('#todoDescription').val(`${element.description}`)
            $('#todoDue').val(`${new Date(element.due_date).toISOString().substring(0, 10)}`)
            $('#editTodoid').val(element.id)
            $('.add-todo-group').hide()
            $('.edit-todo-group').show()
            $('#submitEditTodo').hide()
            $('#submitEditProjectTodo').show()
            $('.add-project-todo-group').hide()
        })

        $(document).on('click', `#edit-${element.id}`, function (e) {
            e.preventDefault()
            // alert(element.due_date)
            $('#todoTitle').val(`${element.title}`)
            $('#todoDescription').val(`${element.description}`)
            $('#todoDue').val(`${new Date(element.due_date).toISOString().substring(0, 10)}`)
            $('#editTodoid').val(element.id)
            $('.add-todo-group').hide()
            $('.edit-todo-group').show()
            $('#submitEditTodo').show()
            $('#submitEditProjectTodo').hide()
            $('.add-project-todo-group').hide()
        })
        $(document).on('click', `#change-${element.id}`, function (e) {
            e.preventDefault()
            switch (element.status) {
                case 'Not Done':
                    changeStatus(element.id, 'Finished')
                    break;
                default:
                    changeStatus(element.id, 'Not Done')
                    break;
            }
        })
        $(document).on('click', `#delete-${element.id}`, function (e) {
            e.preventDefault()
            deleteTodo(element.id)
        })
    })
    $('#forTodos').show()
}

$(document).on('click', '#newTodoButton', function(e) {
    e.preventDefault()
    $('#todoTitle').val('')
    $('#todoDescription').val('')
    $('#todoDue').val(new Date().toISOString().substring(0, 10))
    $('.add-todo-group').show()
    $('.edit-todo-group').hide()
    $('.add-project-todo-group').hide()
    $('#submitEditTodo').hide()
    $('#submitEditProjectTodo').hide()
})

$(document).on('click', '#addNewProjectTodoButton', function(e) {
    e.preventDefault()
    $('#todoTitle').val('')
    $('#todoDescription').val('')
    $('#todoDue').val(new Date().toISOString().substring(0, 10))
    $('.add-project-todo-group').show()
    $('#submitEditTodo').hide()
    $('.add-todo-group').hide()
    $('.edit-todo-group').hide()
    $('#submitEditProjectTodo').hide()
})