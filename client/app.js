$(document).ready(function () {

  const server = 'http://localhost:3000'

  var loginForm = $('.loginForm')
  var registerForm = $('.registerForm')
  var tableTodo = $('.add')
  // var todolist = $('.todolist')
  var register = $('#register')
  var addTodo = $('#addTodo')
  var updateForm = $('.updateForm')

  if (!localStorage.getItem("token")) {
    registerForm.show()
    loginForm.hide()
    tableTodo.hide()
    updateForm.hide()
  } else {
    loginForm.hide()
    registerForm.hide()
    showTodoList()
    // todolist.show()
    tableTodo.show()
    updateForm.show()
  }

  register.on('submit', function (e) {
    e.preventDefault()
    var name = $("#name").val()
    var email = $('#email').val()
    var username = $('#username').val()
    var password = $('#password').val()

    const user = {
      name: name,
      email: email,
      username: username,
      password: password
    }

    $.ajax({
      method: 'POST',
      url: `${server}/register`,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(user),
    })
      .done(function (data) {
        console.log(data)
      })
      .fail(function (data) {
        console.log(data)
      })
  })


  var redirectToLogin = $('.link')
  redirectToLogin.on('click', function (e) {
    loginForm.show()
    registerForm.hide()
  })

  if (localStorage.getItem('token')) {
    loginForm.hide()

  }

  var login = $('#login')
  login.on('submit', function (e) {
    e.preventDefault()
    var email = $('#emailLogin').val()
    var password = $('#passwordLogin').val()

    const user = {
      email: email,
      password: password
    }

    $.ajax({
      method: 'POST',
      url: `${server}/login`,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(user)
    })
      .done(function (data) {
        localStorage.setItem("token", data)

        tableTodo.show()
        loginForm.hide()

        showTodoList()

      })
      .fail(function (data) {
        console.log(data)
      })
  })

  var template = `<tr>
                <td class = "id"></td>
                <td class = "title"></td>
                <td class = "description"></td>
                <td class = "status"></td>
                <td class = "due_date"></td>
                <td class = "language"></td>
                <td class = "action"> 
                <a type="button" id="deletetodo" class="btn btn-danger btn-sm" role="button">Delete</a> 
                <a type="button" id="updatetodo" class="btn btn-warning btn-sm" role="button" data-toggle="modal" data-target="#updateModal">Update</a> 
                </td>
                </tr>`


  function showTodoList() {
    return $.ajax({
      method: 'GET',
      url: `${server}/todos`,
      headers: {
        token: localStorage.token
      }
    })
      .done(function (data) {
        showTemplate(data)
        // console.log(data, '< ini data yaaa')
      })
      .fail(function (data) {
        console.log(data, '< ini fail')
      })
  }


  let tbody = $('#tbody')

  function showTemplate(todos) {
    tbody.empty()
    for (let i = 0; i < todos.length; i++) {
      let $item = $(template)
      $item.find(".id").text(todos[i].id)
      $item.find(".title").text(todos[i].title)
      $item.find(".description").text(todos[i].description)
      $item.find(".status").text(todos[i].status)
      $item.find(".due_date").text(todos[i].due_date)
      $item.find(".language").text(todos[i].language)
      $item.find('#deletetodo').prop('href', `${server}/todos/${todos[i].id}`)
      $item.find('#updatetodo').prop('href', `${server}/todos/${todos[i].id}`)
      // $item.find('#updatetodo').prop('onclick', updateTodo(todos[i].id))
      tbody.append($item)
    }
  }


  addTodo.on('submit', function (e) {
    e.preventDefault()
    var title = $("#title").val()
    var description = $("#description").val()
    var status = $("#status").val()
    var due_date = $("#duedate").val()

    const addNew = { title, description, status, due_date }

    $.ajax({
      headers: {
        token: localStorage.token
      },
      method: 'POST',
      url: `${server}/todos`,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(addNew),
    })
      .done(function (data) {
        showTodoList()
        console.log(data)
      })
      .fail(function (data) {
        console.log(data)
      })
  })

  console.log(document.activeElement.id, 'ini')


  $(this).click(function (e) {
    if (document.activeElement.id === 'deletetodo') {
      e.preventDefault()
      deleteTodo(document.activeElement.href)
    }
    else if (document.activeElement.id === 'updatetodo') {
      e.preventDefault()
      console.log(document.activeElement.href, "yang mau di update")
      getSingleTodo(document.activeElement.href)
    }
  })

  function deleteTodo(url) {
    return $.ajax({
      method: 'DELETE',
      url: url,
      headers: {
        token: localStorage.token
      },
      contentType: "application/json; charset=utf-8",
    })
      .done(function (data) {
        // console.log('yes')
        showTodoList()

      })
      .fail(function (data) {
        console.log(data)
      })
  }

  function getSingleTodo(url) {
    $.ajax({
      headers: {
        token: localStorage.token,
      },
      url: url
    })
      .done(function (data) {
        $('#edit_id').val(data.id)
        $('#titleUpdate').val(data.title)
        $('#descriptionUpdate').val(data.description)
      })
      .fail(function (data) {
        console.log(data)
      })
  }

  var update = $('#updateTodo')

  update.on('submit', function (e) {
    e.preventDefault()
    var id = $("#edit_id").val()
    var title = $("#titleUpdate").val()
    var description = $("#descriptionUpdate").val()
    var status = $("#statusUpdate").val()
    var due_date = $("#duedateUpdate").val()

    const updateData = { title, description, status, due_date }

    $.ajax({
      method: 'PUT',
      url: `${server}/todos/${id}`,
      headers: {
        token: localStorage.token
      },
      data: JSON.stringify(updateData),
      contentType: "application/json; charset=utf-8",
    })
      .done(function (data) {
        console.log(data)
        $('#updateModal').modal('hide')
        showTodoList()
      })
      .fail(function (data) {
        console.log(data)
      })


  })

})
