$(document).ready(function () {
  var username = $('#username')
  var email = $('#email')
  var password = $('#password')
  const $todoListContainer = $('#todolistPage');
  const $editTodolist = $('#editTodosDiv');
  const $formEditTodos = $('#editTodos');
  const server = 'http://localhost:3000';
  var itemArray = []


  var registerClass = $('#registerClass')
  var loginClass = $('#loginClass')
  registerClass.hide()
  $('#todolistPage').hide()

  if (!localStorage.getItem('token')) {
    $('#loginClass').show()
    $('#addTodosDiv').hide()
  } else {
    $('#loginClass').hide()
    $('#addTodos').hide()
    showAllTodos()
  }

  function register(username, email, password) {
    $.ajax({
      method: 'POST',
      url: `${server}/user/register`,
      data: {
        username: username.val(),
        email: email.val(),
        password: password.val()
        // username: $('#username').val(),
        // email: $('#email').val(),
        // password: $('#password').val()
      },
      success: function (data) {
        // showTableTodos(data)
        showAllTodos()
        $('#todolistPage').show()
        // console.log(data, '<<<< data sukses register')
      },
      error: function (err) {
        console.log(err, 'error')
      }
    });
  }

  $('#register').on('click', function (event) {
    $('#loginClass').hide()
    $('#registerClass').hide()
    event.preventDefault()
    register(username, email, password)
  })

  $('#registerShow').on('click', function (event) {
    event.preventDefault()
    $('#loginClass').hide()
    $('#registerClass').show()
    // register(username, email, password)
  })

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

        // console.log(data, 'ini add')
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
        showAllTodos()
        $('#todolistPage').show()
      },
      error: function (err) {
        console.log(err, 'error')
      }
    });
  }

  $('#login').on('click', function (event) {
    event.preventDefault()
    login(email, password)
  })


  // showAll todos
  function showAllTodos() {
    return $.ajax({
      method: 'GET',
      url: `${server}/todos`,
      headers: {
        token: localStorage.token
      },
      success: function (data) {
        showTableTodos(data)
        $('#todolistPage').show()
        $('#addTodosDiv').hide()
        $('#editTodosDiv').hide()
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
    itemArray = [];
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

      // set Text ke data
      // $item.find('.editTodos').data('index', itemArray.length)
      // $item.find('.deleteTodos').data('index', itemArray.length)
      // $item.data('id', data[i].id);
      // $item.data('title', data[i].title);
      // $item.data('description', data[i].description);
      // $item.data('status', data[i].status);
      // $item.data('due_date', data[i].due_date);

      // itemArray.push($item)
      table.append($item)
    }
  }



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
        $('#due_dateEdit').val(data.due_date)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }

  function editTodos(url) {
    $.ajax({
      method: 'PUT',
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

  // $todoListContainer.on('click', '.editTodos', function (event) {
  //   let index = $(this).data('index')
  //   editTodos(index)
  // })

  // function editTodos(index) {
  //   $todoListContainer.hide();
  //   $editTodolist.show()
  //   $editTodolist.find('#idTodo').val(itemArray[index].data('id'));
  //   $editTodolist.find('#titleEdit').val(itemArray[index].data('title'));
  //   $editTodolist.find('#descriptionEdit').val(itemArray[index].data('description'));
  // }

  // $formEditTodos.on('submit', function (e) {
  //   e.preventDefault();
  //   var title = $editTodolist.find('#titleEdit').val();
  //   var id = $editTodolist.find('#idTodo').val();
  //   var description = $editTodolist.find('#descriptionEdit').val();

  //   postTodoEdit(id, { title: title, description: description }, function () {
  //     showAllTodos()
  //     $todoListContainer.show();
  //     $editTodolist.hide()
  //   })
  // })

  // function postTodoEdit(id, data, cb) {
  //   $.ajax({
  //     url: `${server}/todos/${id}`,
  //     method: "PUT",
  //     data: data,
  //     headers: { token: localStorage.getItem('token') },
  //     success: cb,
  //     error: function (err, data) {
  //       console.log(err, data)
  //     }
  //   })
  // }





})