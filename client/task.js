'use strict'

// var url = `http://localhost:3000`
// var $modalUpdate = $('#updateTaskModal')

class Task {

  static templateTable(index, id, title, description, status, duedate){
    if (status == true){
      return `<tr>
                  <th scope="row" style="color: white">${index}</th>
                  <td style="color: white">${title}</td>
                  <td style="color: white">${description}</td>
                  <td style="color: white">Done</td>
                  <td style="color: white">${duedate}</td>
                  <td style="color: white">
                  <button type="button" class="btn btn-danger btn-rounded" data-toggle="modal" data-target="#modalConfirmDelete" onclick="Task.beforeDelete(${id})">Delete</button>
                  </td>
                  </tr>`
    } else {
      return `<tr>
                  <th scope="row" style="color: white">${index}</th>
                  <td style="color: white">${title}</td>
                  <td style="color: white">${description}</td>
                  <td style="color: white">Not yet</td>
                  <td style="color: white">${duedate}</td>
                  <td style="color: white">
                  <button type="button" class="btn btn-info btn-rounded" onclick="Task.beforeEdit(${id})" data-toggle="modal" data-target="#updateTaskModal">Update</button>
                  <br>
                  <br>
                  <button type="button" class="btn btn-danger btn-rounded" onclick="Task.beforeEdit(${id})" data-toggle="modal" data-target="#modalStatusDone">Done</button>
                  </td>
                  </tr>`
    }
    }

  static list(){
    return $.ajax({
      method: "GET",
      headers: {token: localStorage.token},
      url: `${url}/todos`,
      success: (response) => {
        if (response.message == 'Data is empty.'){
          $('#listOfTodo').empty()
        } else {
          $('#listOfTodo').empty()
          response.forEach((el, index) => {
            let allData = Task.templateTable(index+1, el.id, el.title, el.description, el.status, new Date(el.due_date))
            $('#listOfTodo').append(allData)
          })
          $('#listOfTodo').show(1000)
        }
      }
    })
  }

  static addTask(e){
    e.preventDefault()
    const addData = $('#form-addTask').serialize()
    console.log(addData)
    $.ajax({
      method: "POST",
      headers: {token: localStorage.token},
      url: `${url}/todos`,
      data: addData,
      dataType: 'json'
    })
    .done(res => {
      $('#addTaskModal').modal('toggle')
      $('#titleAdd').val('')
      $('#descriptionAdd').val('')
      $('#duedateAdd').val('')
      Task.list()

      
    })
    .fail(err => {
      console.log(err)
    })
  }

  static editStatusDone(e){
    console.log($('#titleTaskUpdate').val())
    e.preventDefault()
    return $.ajax({
      method: "PUT",
      headers: {token: localStorage.token},
      url: `${url}/todos/${localStorage.taskId}`,
      data: {
        title: $('#titleTaskUpdate').val(),
        description: $('#descriptionTaskUpdate').val(),
        status: true,
        due_date: $('#due_dateTaskUpdate').val()
      }
    })
    .done(res => {
      $('#modalStatusDone').modal('toggle')
      Task.list()
    })
    .fail(err => {
      console.log(err)
    })
  }

  static beforeEdit(id){
    localStorage.setItem('taskId', id)
    return $.ajax({
      method: "GET",
      headers: {token: localStorage.token},
      url: `${url}/todos/${id}`
    })
    .done(res => {
      console.log('masuk beforeEdit')
      $('#titleTaskUpdate').val(res.title)
      $('#descriptionTaskUpdate').val(res.description)
      $('#statusTaskUpdate').val(res.status)
      let formatDate = res.due_date.split('T')[0]
      $('#due_dateTaskUpdate').val(formatDate)
    })
    .fail(err => {
      console.log(err)
    })
  }

  static edit(e){
    e.preventDefault()
    const editData = $('#form-updateTask').serialize()
    return $.ajax({
      method: "PUT",
      headers: {token: localStorage.token},
      url: `${url}/todos/${localStorage.taskId}`,
      data: editData,
      dataType: 'json'
    })
    .done(res => {
      $('#updateTaskModal').modal('toggle')
      Task.list()
    })
    .fail(err => {
      console.log(err)
    })
  }

  static beforeDelete(id){
    localStorage.setItem('taskId', id)
  }
  
  static delete(e){
    e.preventDefault()
    return $.ajax({
      method: "DELETE",
      headers: {token: localStorage.token},
      url: `${url}/todos/${localStorage.taskId}`
    })
    .done(res => {
      $('#modalConfirmDelete').modal('toggle')
      Task.list()
    })
    .fail(err => {
      console.log(err)
    })
  }

}