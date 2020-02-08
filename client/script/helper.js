var $modal = $('.modal')
var $message = $('.message')
var $loginOrRegister = $('#loginOrRegister')
var $modalbody = $('.modal-body')
var $tableTodo = $('#tableTodo')
var $tableProject = $('#tableProject')
var $btnListTable = $('#btnListTable')
function clearMessage(){
  $message.empty()
}

function errorFormModal(error){
  $modalbody.find('.invalid-feedback').remove()
  $modalbody.find('.form-control.is-invalid').attr("class","form-control")
  for (var key in error){
    $modalbody.find(`#${key}`).addClass('is-invalid')
    $modalbody.find(`.form-group.${key}`).append(errorTemplate(error[key]))
  }
}

function makeMessage(message,type='success'){
  var template = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>` 
  $message.append(template)
}
function clearModal(){
  $modal.find('.modal-body').empty()
}

function hideModal(){
  $modal.modal('toggle');
}

function errorTemplate(str){
  return `<div class="invalid-feedback">${str}</div>`
}

function loginOrRegister(type){
  $loginOrRegister.find('.form-signin').removeAttr("id")
  if(type === 'login'){
    $loginOrRegister.find('#btnRegister').removeClass('active')
    $loginOrRegister.find('#btnLogin').addClass('active')
    $loginOrRegister.find('#titleLR').text('Sign In')
    $loginOrRegister.find('#btnSubmit').text('Sign In')
    $loginOrRegister.find('.form-signin').attr("id","loginForm")
    
  }else{
    $loginOrRegister.find('#btnLogin').removeClass('active')
    $loginOrRegister.find('#btnRegister').addClass('active')
    $loginOrRegister.find('#titleLR').text('Register')
    $loginOrRegister.find('#btnSubmit').text('Register')
    $loginOrRegister.find('.form-signin').attr("id","registerForm")
  }
}

function changeTable(type){
  switch (type) {
    case "todo":
      $btnListTable.find('#btnListProject').removeClass('active')
      $btnListTable.find('#btnListTodo').addClass('active')
      $tableTodo.show()
      $tableProject.hide()
      break;
    case "project":
      $btnListTable.find('#btnListTodo').removeClass('active')
      $btnListTable.find('#btnListProject').addClass('active')
      $tableTodo.hide()
      $tableProject.show()
      break;
    default:
      break;
  }
}

function generateModal(type,id=null){
  clearMessage()
  clearModal()
  var template
  switch (type) {
    case "add":
      template = `<form id="addTodoForm">
                    <div class="form-group title">
                      <label>Title</label>
                      <input type="text" class="form-control" id="title">
                    </div>
                    <div class="form-group description">
                      <label>Description</label>
                      <input type="text" class="form-control" id="description">
                    </div>
                    <div class="form-group due_date">
                      <label>Due Date</label>
                      <input type="date" class="form-control" id="due_date">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>`
      break;
      case "edit":
        template = `<form id="editTodoForm${id}">
                      <div class="form-group title">
                        <label>Title</label>
                        <input type="text" class="form-control" id="title">
                      </div>
                      <div class="form-group description">
                        <label>Description</label>
                        <input type="text" class="form-control" id="description">
                      </div>
                      <div class="form-group due_date">
                        <label>Due Date</label>
                        <input type="date" class="form-control" id="due_date">
                      </div>
                      <div class="form-group status">
                        <label>Status</label>
                        <select class="form-control" id="status">
                          <option value="incomplete" id="incomplete">incomplete</option>
                          <option value="completed" id="completed">completed</option>
                        </select>
                      </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </form>`
        break;
      case "addProject":
        template = `<form id="addProjectForm">
                      <div class="form-group name">
                        <label>Name</label>
                        <input type="text" class="form-control" id="name">
                      </div>
                      <div class="form-group due_date">
                        <label>Due Date</label>
                        <input type="date" class="form-control" id="due_date">
                      </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </form>`
        break;
      case "editProject":
        template = `<form id="editProjectForm${id}">
                      <div class="form-group name">
                        <label>name</label>
                        <input type="text" class="form-control" id="name">
                      </div>
                      <div class="form-group due_date">
                        <label>Due Date</label>
                        <input type="date" class="form-control" id="due_date">
                      </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <table class="table table-striped table-light mt-3 text-center" id="tableMember${id}">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">name</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody id="memberList">
                      </tbody>
                    </table>
                    <form id="editProjectUserForm${id}">
                      <div class="form-group UserId">
                        <label>new member</label>
                        <select id="listUserProject" class="form-control">
                        </select>
                      </div>
                      <button type="submit" class="btn btn-primary">Add</button>
                    </form>
                    `
          break;
    default:
      break;
  }
  $modal.find('.modal-body').append(template)
}

function makeTable(){
  const template = `<tr>
                      <td class="id"></td>
                      <td class="title"></td>
                      <td class="description"></td>
                      <td class="status"></td>
                      <td class="due_date"></td>
                      <td class="action">
                      
                      </td>
                    </tr>`

  var editbtn = `<button type="button" data-toggle="modal" data-target="#exampleModalCenter" onClick=` 
  var deletebtn = `<button type="button" onClick="return confirm('Are you sure to delete ?') ? `
  var $todoList = $('#todoList')

  $todoList.empty()
  if(todos){
    for (var i = 0; i < todos.length; i++){
      var $item = $(template)
      $item.find('.id').text(todos[i].id)
      $item.find('.title').text(todos[i].title)
      $item.find('.description').text(todos[i].description)
      $item.find('.status').text(todos[i].status)
      $item.find('.due_date').text(todos[i].due_date)
      $item.find('.action').append(editbtn + `"editTodo(`+ todos[i].id + `)" class="btn btn-info mr-2">Edit</button>`)
      $item.find('.action').append(deletebtn + `deleteTodo(`+ todos[i].id + `) : ''" class="btn btn-danger">Delete</button>`)
      $todoList.append($item)
    }
  }
}

function makeTableProject(){
  const template = `<tr>
                      <td class="id"></td>
                      <td class="name"></td>
                      <td class="due_date"></td>
                      <td class="action">
                      
                      </td>
                    </tr>`

  var editbtn = `<button type="button" data-toggle="modal" data-target="#exampleModalCenter" onClick=` 
  var deletebtn = `<button type="button" onClick="return confirm('Are you sure to delete ?') ? `
  var $projectList = $('#projectList')

  $projectList.empty()
  if(projects){
    for (var i = 0; i < projects.length; i++){
      var $item = $(template)
      $item.find('.id').text(projects[i].id)
      $item.find('.name').text(projects[i].name)
      $item.find('.due_date').text(projects[i].due_date)
      $item.find('.action').append(editbtn + `"editProjectForm(`+ projects[i].id + `)" class="btn btn-info mr-2">Edit</button>`)
      $item.find('.action').append(deletebtn + `deleteProject(`+ projects[i].id + `) : ''" class="btn btn-danger">Delete</button>`)
      $projectList.append($item)
    }
  }
}

function date(date){
  var now = new Date(date);

  var day = ("0" + now.getDate()).slice(-2)
  var month = ("0" + (now.getMonth() + 1)).slice(-2)

  var today = now.getFullYear()+"-"+(month)+"-"+(day)
  return today
}

