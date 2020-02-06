var url = `http://localhost:3000`

var $loginPage = $('#login-page')
var $headerLogin = $('#headerLogin')
var $headerLogout = $('#headerLogout')
var $registerPage = $('#register-page')
var $listPage = $('#list-page')
var $addTaskPage = $('#addTask-page')
var $headerLogoutGoogle = $('#headerGoogleLogout')
var $modalUpdate = $('#updateTaskModal')

function templateTable(index, title, description, duedate, id) {
  return `<tr>
                <th scope="row" style="color: white">${index}</th>
                <td style="color: white">${title}</td>
                <td style="color: white">${description}</td>
                <td style="color: white">${duedate}</td>
                <td style="color: white">
                <a role="button" data-toggle="modal" data-target="#updateTaskModal"href="${url}/todos/${id}" id="updateTaskButton">Update</a>
                <br>
                <a role="button" href="${url}/todos/${id}" id="deleteTask">Delete</a>
                </td>
                </tr>`
}

function getAllData(){
  return $.ajax({
    method: "GET",
    headers: {token: localStorage.token},
    url: `${url}/todos`,
    success: function (response) {
      console.log(response)
      $('#listOfTodo').empty()
      response.forEach((element, index) => {
        let todos = templateTable(index+1, element.title, element.description, new Date(element.due_date), element.id)
        $('#listOfTodo').append(todos)
      });
    }
  });
}

function getDataTaskById(link) {
  $.ajax({
    method: "GET",
    headers: {token: localStorage.token},
    url: link
  })
  .done(res => {
    console.log(res)
    $('#inputId').val(res.id)
    $('#titleTaskUpdate').val(res.title)
    $('#descriptionTaskUpdate').val(res.description)
    $('#statusTaskUpdate').val(res.status)
    // $('#dateTaskUpdate').val(res.date)
  })
  .fail(err => {
    console.log('fail')
  })
}

function deleteData(link){
  return $.ajax({
    method: "DELETE",
    headers: {token: localStorage.token},
    url: link
  })
  .done(res => {
    getAllData()
  })
  .fail(err => {

  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  localStorage.removeItem('token')
  auth2.signOut().then(function () {
  console.log('User signed out.');
  });
  $headerLogout.hide()
  $loginPage.show()
  $headerLogin.show()
  $headerLogoutGoogle.hide()
  $listPage.hide()
  $addTaskPage.hide()
  $('#emailLogin').val('')
  $('#passwordLogin').val('')

  // $headerLogout.hide()
  // $loginPage.show()
  // $headerLogin.show()
}

function onSignIn(googleUser){
  console.log('tes bro')
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    type: "POST",
    url: `${url}/login/google`,
    data: {
      googleToken: id_token
    }
  })
  .done(response => {
    console.log(response)
    localStorage.setItem('token', response.token)
    $loginPage.hide()
    $headerLogin.hide()
    $registerPage.hide()
    $headerLogoutGoogle.show()
    $headerLogout.hide()
    getAllData()
    $listPage.show()
    $addTaskPage.show()
  })
  .fail(error => {
    console.log("error nihh");
  })
}

function addTask(title, description, status, duedate){
  return $.ajax({
    method: "POST",
    headers: {token: localStorage.token},
    url: `${url}/todos`,
    data: {
      title: title,
      description: description,
      status: status,
      due_date: duedate
    }
  })
  .done(res => {
    getAllData()
  })
  .fail(err => {

  })
}

function editTask(id, title, description, status, duedate){
  return $.ajax({
    method: "PUT",
    headers: {token: localStorage.token},
    url: `${url}/todos/${id}`,
    data: {
      title: title,
      description: description,
      status: status,
      due_date: duedate
    }
  })
  .done(res => {
    $modalUpdate.modal('hide')
    getAllData()

  })
  .fail(err => {

  })
}

// SYSTEM //

$registerPage.hide()
$listPage.hide()
$addTaskPage.hide()
$headerLogoutGoogle.hide()
if(localStorage.getItem('token')){
  $loginPage.hide()
    $headerLogin.hide()
    $registerPage.hide()
    $headerLogoutGoogle.show()
    $headerLogout.hide()
    getAllData()
    $listPage.show()
    $addTaskPage.show()
} else {
  $headerLogout.hide()
  $('#form-login').on('submit', function (e) {
    e.preventDefault()
    const value = {
      email: $('#emailLogin').val(),
      password: $('#passwordLogin').val()
    }
    $.ajax({
      method: "post",
      url: `${url}/login`,
      data: value
    }).done(function (response) {
      localStorage.setItem('token', response.token)
      $loginPage.hide()
      $headerLogin.hide()
      $registerPage.hide()
      $headerLogoutGoogle.show()
      getAllData()
      $listPage.show()
      
      
    }).fail(err => {
      console.log(err)
    })
  })
}

// LOGOUT //
$('#logout').on('click', function(e){
  e.preventDefault()
  localStorage.removeItem('token')
  $headerLogout.hide()
  $loginPage.show()
  $headerLogin.show()
  $headerLogoutGoogle.hide()

})

// REGISTER FORM //
$('#register').on('click', function(e){
  e.preventDefault()
  $loginPage.hide()
  $registerPage.show()
})

// REGISTER USER //
$('#form-register').on('submit', function (e) {
  e.preventDefault()
  const value = {
    email: $('#emailRegister').val(),
    password: $('#passwordRegister').val()
  }
  $.ajax({
    method: "post",
    url: `${url}/user/register`,
    data: value
  }).done(function (response) {
    $loginPage.show()
    console.log(response)
  }).fail(err => {
    console.log(err)
  })
})

// ADD TASK //
$('#form-addTask').on('submit', function (e) {
  var $title = $('#titleTask').val()
  var $description = $('#descriptionTask').val()
  var $status = $('#statusTask').val()
  var $duedate = $('#due_dateTask').val()
  e.preventDefault()
  addTask($title, $description, $status, $duedate)
})

// DELETE TASK //
$(this).on('click', function(e){
  if(document.activeElement.id == 'deleteTask'){
    e.preventDefault()
    deleteData(document.activeElement.href)
  } else if (document.activeElement.id == 'updateTaskButton'){
    e.preventDefault()
    console.log('asf')
    getDataTaskById(document.activeElement.href)
  }
})

// UPDATE FORM //
$('#form-updateTask').on('submit', (e)=> {
  var $id = $('#inputId').val()
  var $title = $('#titleTaskUpdate').val()
  var $description = $('#descriptionTaskUpdate').val()
  var $status = $('#statusTaskUpdate').val()
  var $duedate = $('#due_dateTaskUpdate').val()
  
  e.preventDefault()
  editTask($id, $title, $description, $status, $duedate)
})

