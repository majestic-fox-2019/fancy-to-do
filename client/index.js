
const server = 'https://murmuring-basin-72616.herokuapp.com'
// const server = 'http://localhost:3000'


// showAll todos
function showAllTodos() {
  $.ajax({
    method: 'GET',
    url: `${server}/todos`,
    headers: {
      token: localStorage.token
    },
    success: function (data) {
      showTableTodos(data)
      $('#todolistPage').show()
      // $('#addTodosDiv').hide()
      // $('#editTodosDiv').hide()
      // console.log(data, 'ini data showall')
    },
    error: function (err) {
      console.log(err)
    }
  })
}

var table = $('#tableTodos')
var template = `
<tr>
        <td class='id'></td>
        <td class='title'></td>
        <td class='description'></td>
        <td class='status'></td>
        <td class='due_date'></td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" id="editTodos">Edit</button>
            <button type="button" class="btn btn-secondary" id="deleteTodos">Delete</button>
          </div>
        </td>
      </tr>
`

function showTableTodos(data) {
  table.empty()
  // itemArray = [];
  for (let i = 0; i < data.length; i++) {
    var $item = $(template)
    // set text ke DOM
    $item.find('.id').text(data[i].id)
    $item.find('.title').text(data[i].title)
    $item.find('.description').text(data[i].description)
    $item.find('.status').text(data[i].status)
    $item.find('.due_date').text(data[i].due_date.split('T')[0])
    $item.find('#deleteTodos').prop('href', `${server}/todos/${data[i].id}`)
    $item.find('#editTodos').prop('href', `${server}/todos/${data[i].id}`)

    table.append($item)
  }
}


$(document).ready(function () {

  var username = $('#username')
  var email = $('#email')
  var password = $('#password')
  var registerClass = $('#registerClass')
  var loginClass = $('#loginClass')
  registerClass.hide()
  $('#todolistPage').hide()
  $('#addTodosDiv').hide()
  $('#editTodosDiv').hide()
  $('#loginClass').hide()




  if (!localStorage.getItem('token')) {
    $('#addTodosDiv').hide()
    $('#editTodosDiv').hide()
    $('#loginClass').show()
  } else {
    $('#todolistPage').show()
    $('#loginClass').hide()
    $('#addTodos').hide()
    showAllTodos()
  }




  // Register

  function register(username, email, password) {
    $.ajax({
      method: 'POST',
      url: `${server}/user/register`,
      data: {
        username: username.val(),
        email: email.val(),
        password: password.val()
      },
      success: function (data) {

        localStorage.setItem('token', data)
        showAllTodos()
        $('#loginClass').hide()
        $('#todolistPage').show()

      },
      error: function (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.responseText,
          // footer: '<a href>Why do I have this issue?</a>'
        })

        // console.log(err, 'error')
        $('#loginClass').show()
      }
    });
  }

  $('#register').on('click', function (event) {
    $('#loginClass').hide()
    $('#registerClass').hide()
    event.preventDefault()
    register(username, email, password)
  })

  // $('#registerShow').on('click', function (event) {
  //   event.preventDefault()
  //   $('#loginClass').hide()
  //   $('#registerClass').show()
  //   // register(username, email, password)
  // })
  // --------------------------------------------------------------------//

  // login..
  function login(email, password) {
    $.ajax({
      method: 'POST',
      url: `${server}/user/login`,
      data: {
        email: $('#emailLogin').val(),
        password: $('#passwordLogin').val()
      },
      success: function (data) {
        localStorage.setItem('token', data)
        loginClass.hide()
        showAllTodos(data)
        $('#todolistPage').show()
        $('#editTodosDiv').hide()
      },
      error: function (err) {
        console.log(err, 'error')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Periksa kembali Email atau Password Anda'
        })
      }
    });
  }

  $('#loginWeb').on('click', function (event) {
    event.preventDefault()
    login(email, password)
  })

  // --------------------------------------------------------------------//



  // add Todos
  function addTodos(titleAdd, descriptionAdd, due_dateAdd) {
    $.ajax({
      method: 'POST',
      url: `${server}/todos`,
      data: {
        title: $('#titleAdd').val(),
        description: $('#descriptionAdd').val(),
        due_date: $('#due_dateAdd').val()
      },
      headers: {
        token: localStorage.token
      },
      success: function (data) {
        showAllTodos()
        // showTableTodos(data)
        $('#todolistPage').show()
        $('#addTodosDiv').hide()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'To-Do List Sudah Tersimpan',
          showConfirmButton: false,
          timer: 2000
        })
      },
      error: function (err) {
        console.log(err)
      }
    })
  }

  $('#todosForm').on('submit', function (event) {
    event.preventDefault()
    let titleAdd = $('#titleAdd').val()
    let descriptionAdd = $('#descriptionAdd').val()
    let due_dateAdd = $('#due_dateAdd').val()
    addTodos(titleAdd, descriptionAdd, due_dateAdd)
  })

  $('#AddTodoList').on('click', function (event) {
    event.preventDefault()
    $('#loginClass').hide()
    $('#registerClass').hide()
    $('#todolistPage').hide()
    $('#addTodosDiv').show()
  })





  $(this).on('click', function (event) {
    if (document.activeElement.id == "deleteTodos") {

      event.preventDefault()
      deleteTodos(document.activeElement.href)

    }
    else if (document.activeElement.id == "editTodos") {
      $('#editTodosDiv').show()
      $('#todolistPage').hide()
      event.preventDefault()
      getTodos(document.activeElement.href)
    }
  })

  function deleteTodos(url) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        $.ajax({
          method: 'DELETE',
          url: url,
          headers: {
            token: localStorage.token
          },
          success: function () {

            showAllTodos()
            $('#todolistPage').show()
          },
          error: function (err) {
            console.log(err)
          }
        })
      }
    })
  }

  $('#logoutTodoList').on('click', function (event) {
    event.preventDefault()
    localStorage.removeItem('token')

    $('#loginClass').show()
    $('#todolistPage').hide()

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      // console.log('User signed out.');
    });
  })

  function getTodos(url) {
    $.ajax({
      headers: {
        token: localStorage.token
      },
      url: url,
      success: function (data) {
        localStorage.setItem('id', data.id)
        $('#titleEdit').val(data.title)
        $('#descriptionEdit').val(data.description)
        $('#statusEdit').val(data.status)
        $('#due_dateEdit').val(`${new Date(data.due_date).toISOString().substring(0, 10)}`)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }


  $('#editTodos').on('submit', function (event) {
    event.preventDefault()
    $.ajax({
      method: "PUT",
      url: `${server}/todos/${localStorage.id}`,
      headers: {
        token: localStorage.token
      },
      data: {
        title: $('#titleEdit').val(),
        description: $('#descriptionEdit').val(),
        status: $('#statusEdit').val(),
        due_date: $('#due_dateEdit').val()
      },
      success: function () {
        localStorage.removeItem('id')
        showAllTodos()
        $('#todolistPage').show()
        $('#editTodosDiv').hide()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'To-Do List Sudah Tersimpan',
          showConfirmButton: false,
          timer: 2000
        })
      },
      error: function (err) {
        console.log(err)
      }
    })
  })



})



// github login
// function gitHubSignIn() {
//   if (window.location.search) {
//     const query = window.location.search.substring(1)
//     const token = query.split('token=')[1].split('&')[0]
//     const name = query
//       .split('name=')[1]
//       .split('&')[0]
//       .split('%20')
//       .join(' ')
//     const email = query.split('email=')[1].split('&')[0]
//     if (token) {
//       localStorage.setItem('token', token)
//       localStorage.setItem('name', name)
//       localStorage.setItem('email', email)
//       window.location = 'http://localhost:8080'
//     }
//   }

//   if (localStorage.getItem('token')) {
//     showAllTodos()
//     $('#todolistPage').show()
//     $('#editTodosDiv').hide()
//     $('#loginClass').hide()
//   }
// }

// $('#btn_gitHub').on('submit', function (event) {
//   event.preventDefault()
//   gitHubSignIn()
// })


// $('#btn_google').on('submit', function (event) {
//   event.preventDefault()
//   onSignIn()
// })

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `${server}/user/googleSignIn`,
    data: {
      token: id_token
    },
    success: function (data) {
      localStorage.setItem('token', data)
      $('#todolistPage').show()
      $('#editTodosDiv').hide()
      $('#loginClass').hide()
      showAllTodos()
    }
  })
}



