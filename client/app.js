const loginPage= $('#login-page')
const loginForm=$('#login-form')

const registerPage =$('#register-page')
const registerForm= $('#register-form')

const userPage = $('#user')
const addTodo = $('#add-todo')
const baseUrl = 'http://localhost:3000/'

userPage.hide()
registerPage.hide();

$('#show-register').click(function (e) {
  e.preventDefault()
  registerPage.show();
  loginPage.hide();
})

$('#show-sign').click(function (e) {
  e.preventDefault()
  registerPage.hide();
  loginPage.fadeIn();
});


$('#log-out').click(function (e) {
  localStorage.removeItem('token')
  signOut()
  loginPage.show();
  userPage.hide()
})



// starting
start()

function start(){
  if (localStorage.getItem('token')) {
    loginPage.hide();
    registerPage.hide();
    showList()
    userPage.show()
  } else {
    loginPage.show();
  } 
}


// register
registerForm.on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    url: `${baseUrl}register`,
    type: "POST",
    data: {
      name: $('#name').val(),
      email: $('#email').val(),
      password: $('#password').val()
    }
  }).done(function (response) { //
    registerPage.hide()
    start()
  });
});

// // login
loginForm.on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    url: `${baseUrl}login`,
    type: "POST",
    data: {
      email: $('#email-login').val(),
      password: $('#password-login').val()
    }
  }).done(function (response) { 
    localStorage.setItem("token", response.token)
    start()
  });
});


// // add todo list
addTodo.on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    headers: { token: localStorage.getItem('token') },
    url: `${baseUrl}todos`,
    type: "POST",
    data: {
      title: $('#title').val(),
      description: $('#description').val(),
      due_date: $('#due-date').val()
    }
  }).done(function (response) { //
    $('#add-form').modal('hide')
   start()
  });
});



function showList() {
  $("#table-user").empty();
  $.ajax({
    url: `${baseUrl}todos`,
    headers: { token: localStorage.getItem('token') },
    type: 'GET',
    success: function (res) {

      if (res) {
        res.forEach(data => {
          let date = new Date(data.createdAt).toDateString()
          let due_date = new Date(data.due_date).toDateString()
          let html = `<tr>
          <th scope="row">${data.id}</th>
          <td>${data.title}</td>
          <td>${data.description}</td>
          <td>${data.status}</td>
          <td>${date}</td>
          <td>${due_date}</td>
          <td>
          <button type="button" class="btn btn-danger btn-sm delete-todo">Delete</button>
          <button type="button" data-toggle="modal" data-target="#edit-form" class="btn btn-success btn-sm update-todo">Update</button>
          </td>
          </tr> `;

          let $html = $(html);
          $html.on('click', '.delete-todo', function () {
            deleteTodo(data.id)
          })

          $html.on('click', '.update-todo',function () {
            updateform(data.id)
          })
          $("#table-user").append($html);

        });
      }

      userPage.show();
    }
  });
}

function deleteTodo(id) {
  $.ajax({
    url: `${baseUrl}todos/${id}`,
    headers: { token: localStorage.getItem('token') },
    type: 'DELETE',
    success: function (result) {
      start()
    }
  })
}

function updateform(id) {
  $.ajax({
    url: `${baseUrl}todos/${id}`,
    headers: { token: localStorage.getItem('token') },
    type: "GET",
    success: function (data) {
      let date = new Date(data.due_date).toISOString().substring(0, 10);
      $('#edit-id').val(data.id)
      $('#edit-title').val(data.title),
      $('#edit-description').val(data.description)
      $('#edit-due-date').val(date)
    }
  })
}




 $('#update-todo').on('submit', function (e) {
    e.preventDefault()
  
    let id = $('#edit-id').val()

    $.ajax({
      headers: { token: localStorage.getItem('token') },
      url: `${baseUrl}todos/${id}`,
      type: "PUT",
      data: {
        title: $('#edit-title').val(),
        description: $('#edit-description').val(),
        due_date: $('#edit-due-date').val(),
        status: $('#edit-status').val()
      }
    }).done(function (response) {
      $('#edit-form').modal('hide')
      start()
    });
 });


  
 // google 
 function onSignIn(googleUser) {

  var id_token = googleUser.getAuthResponse().id_token
  console.log(id_token,'++++++++++++=')
  $.ajax({
    url :`${baseUrl}google-sign-in`,
    method : 'POST',
    data :{ id_token },
    success : function (res){
      let token = res
      localStorage.setItem("token", token)
      localStorage.setItem('type', 'google')
      start()
    }
  })

  }
  
// }

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 40,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}