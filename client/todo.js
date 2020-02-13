const server = 'http://localhost:3000'

class TodoApps {
  static template() {
    let template = `<tr>
    <td class = "id"></td>
    <td class = "title"></td>
    <td class = "description"></td>
    <td class = "status"></td>
    <td class = "due_date"></td>
    <td class = "language"></td>
    <td class = "action"> 
    <a style="font-size: 1.5em; color: orange;  text-align: center" id="updatetodo" role="button" data-toggle="modal" data-target="#updateModal">
        <i class="fas fa-edit"></i>
    </a>
    <a style="font-size: 1.5em; color: red; text-align: center" id="deletetodo" role="button">
        <i class="fas fa-trash"></i>
    </a>
    </td>
    </tr>`

    return $(template)
  }

  static showTodoList() {
    $.ajax({
      method: 'GET',
      url: `${server}/todos`,
      headers: {
        token: localStorage.token
        // },
        // success: function (response) {
        //   TodoApps.showTemplate(response)
      }
    })
      .done(function (todos) {
        TodoApps.showTemplate(todos)
        console.log(todos, '< done di show todolist')
      })
      .fail(function (err) {
        console.log(err, '< error di show todolist')
      })
  }

  static showTemplate(todos) {
    let tbody = $('#tbody')
    tbody.empty()
    for (let i = 0; i < todos.length; i++) {
      let $item = TodoApps.template()

      $item.find(".id").text(i + 1)
      $item.find(".title").text(todos[i].title)
      $item.find(".description").text(todos[i].description)
      $item.find(".status").text(todos[i].status)
      $item.find(".due_date").text((todos[i].due_date).split('T')[0])
      $item.find(".language").text(todos[i].language)
      $item.find('#deletetodo').prop('href', `${server}/todos/${todos[i].id}`)
      $item.find('#updatetodo').prop('href', `${server}/todos/${todos[i].id}`)

      tbody.append($item)
    }
  }

  static addTodo(addNew) {
    $.ajax({
      headers: {
        token: localStorage.token
      },
      method: 'POST',
      url: `${server}/todos`,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(addNew)
    })
      .done(function (todo) {
        $('#addModal').modal('hide')
        TodoApps.showTodoList()
        console.log(todo)
      })
      .fail(function (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.responseJSON.message
        })
      })
  }

  static deleteTodo(url) {
    $.ajax({
      method: 'DELETE',
      url: url,
      headers: {
        token: localStorage.token
      },
      contentType: "application/json; charset=utf-8",
    })
      .done(function (data) {
        TodoApps.showTodoList()

      })
      .fail(function (data) {
        console.log(data)
      })
  }

  static findTodoById(url) {
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

  static updateTodo(id, updateData) {
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
        $('#updateModal').modal('hide')
        TodoApps.showTodoList()
      })
      .fail(function (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.responseJSON.message
        })
      })
  }
}

