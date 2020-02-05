$(document).ready(function() {
  const BASE_URL = 'http://localhost:3000'
  if (localStorage.getItem('token')) {
    closeHome()
    fetchUserTodo()
  } else {
    showHome()
  }

  $('.modal').modal()
  $('.datepicker').datepicker({
    showClearBtn: true,
    format: 'yyyy-mm-dd'
  })
  $('.tooltipped').tooltip()

  function closeHome() {
    $('#login-btn').hide()
    $('#logout-btn').show()
    $('#homepage').hide()
    $('#mainpage').show()
  }

  function showHome() {
    $('#login-btn').show()
    $('#logout-btn').hide()
    $('#homepage').show()
    $('#mainpage').hide()
  }
  // Logout Button

  $(document).on('click', '#logout-btn', function(event) {
    event.preventDefault()
    localStorage.removeItem('token')
    showHome()
    M.toast({ html: `Logout success`, classes: 'green lighten-1' })
  })

  function login(form) {
    axios
      .post(`${BASE_URL}/users/login`, form)
      .then(result => {
        localStorage.setItem('token', result.data.token)
        $('#email-login').val('')
        $('#password-login').val('')
        closeHome()
        fetchUserTodo()
        $('#loginModal').modal('close')
        M.toast({ html: `Login success`, classes: 'green lighten-1' })
      })
      .catch(err => {
        const errors = err.response.data.err
        errors.forEach(el => {
          M.toast({
            html: `${err.response.status} | ${el}`,
            classes: 'red darken-2'
          })
        })
      })
  }

  $(document).on('click', '#login', function(event) {
    event.preventDefault()
    const form = {
      email: $('#email-login').val(),
      password: $('#password-login').val()
    }
    login(form)
  })

  function register(form) {
    console.log(form)
    axios
      .post(`${BASE_URL}/users/register`, form)
      .then(result => {
        localStorage.setItem('token', result.data.token)
        $('#email').val('')
        $('#password').val('')
        closeHome()
        M.toast({ html: `Registration success`, classes: 'green lighten-1' })
        console.log('Berhasil Register', result)
      })
      .catch(err => {
        const errors = err.response.data.err
        errors.forEach(el => {
          M.toast({
            html: `${err.response.status} | ${el}`,
            classes: 'red darken-2'
          })
        })
      })
  }

  $(document).on('click', '#register', function(event) {
    event.preventDefault()
    const form = {
      email: $('#email').val(),
      password: $('#password').val()
    }
    register(form)
  })

  function fetchUserTodo() {
    $('#todo-item').html('')
    const token = localStorage.getItem('token')
    axios
      .get(`${BASE_URL}/todos`, { headers: { token: `${token}` } })
      .then(results => {
        var cardColor
        let today = new Date()
        results.data.forEach(el => {
          let date = new Date(el.due_date)
          if (el.status == 'done') {
            cardColor =
              '<div class="card green lighten-1 white-text fadeIn delay-1s animated hoverable">'
          } else if (today > date) {
            cardColor =
              '<div class="card red lighten-1 white-text fadeIn delay-1s animated hoverable">'
          } else {
            cardColor =
              '<div class="card white blue-text darken-3-text fadeIn delay-1s animated hoverable">'
          }

          $('#todo-item').append(
            `<div class="col s12 m12" id="${el.id}">
                ${cardColor}
                    <div class="card-content">
                        <div class="row">
                            <div class="col m8">
                                <span class="card-title">${el.title}</span>
                                <p>Due date : ${new Date(
                                  el.due_date
                                ).toDateString()}</p>
                                <br>
                                <p>${el.description}</p>
                            </div>
                            <div class="col m4">
                                <a href="#" class="delete-todo btn red" data-id="${
                                  el.id
                                }""><i class="material-icons prefix">delete</i></a>
                                <a href="#modal-task" class="edit-todo btn yellow modal-trigger" data-title="${
                                  el.title
                                }" data-desc="${el.description}" data-date=${
              el.due_date
            } data-id="${el.id}""><i class="material-icons prefix">edit</i></a>
                                <a href="#" class="patch-todo btn green" data-status="${
                                  el.status
                                }" data-id="${
              el.id
            }""><i class="material-icons prefix">check</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
          )
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  $('.collection-item').on('click', function(event) {
    event.preventDefault()
    $('.active').removeClass('active')
    $(this).addClass('active')
  })

  function deleteTodo(id) {
    const token = localStorage.getItem('token')
    axios
      .delete(`${BASE_URL}/todos/${id}`, { headers: { token: token } })
      .then(result => {
        $(`#${id}`).hide()
        M.toast({
          html: `Todo deleted`,
          classes: 'red lighten-2'
        })
      })
      .catch(err => {
        M.toast({
          html: `${err.response.status} | ${el}`,
          classes: 'red darken-2'
        })
      })
  }

  $(document).on('click', '.delete-todo', function(event) {
    event.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        const id = $(this).data('id')
        deleteTodo(id)
      }
    })
  })

  function patchStatus(id, status) {
    const token = localStorage.getItem('token')
    const data = {
      status: null
    }
    if (status == 'done') {
      data.status = 'ongoing'
    } else {
      data.status = 'done'
    }
    axios
      .patch(`${BASE_URL}/todos/${id}`, data, { headers: { token: token } })
      .then(result => {
        M.toast({
          html: `Status updated`,
          classes: 'green lighten-2'
        })
        fetchUserTodo()
      })
      .catch(err => {
        console.log(err.response)
        M.toast({
          html: `${err.response.status} | ${el}`,
          classes: 'red darken-2'
        })
      })
  }

  $(document).on('click', '.patch-todo', function(event) {
    event.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change its status!'
    }).then(result => {
      if (result.value) {
        const id = $(this).data('id')
        const status = $(this).data('status')
        patchStatus(id, status)
      }
    })
  })

  function addNewTask(data) {
    const token = localStorage.getItem('token')
    axios
      .post(`${BASE_URL}/todos`, data, { headers: { token: token } })
      .then(result => {
        M.toast({
          html: 'New task added',
          classes: 'blue darken-3'
        })
        $('#modal-task').modal('close')
        $('#name').val('')
        $('#description').val('')
        $('#due_date').val('')
        fetchUserTodo()
      })
      .catch(err => {
        const errors = err.response.data.err
        errors.forEach(el => {
          M.toast({
            html: `${err.response.status} | ${el}`,
            classes: 'red darken-2'
          })
        })
      })
  }

  $(document).on('click', '#add-todo', function(event) {
    event.preventDefault()
    const data = {
      title: $('#name').val(),
      description: $('#description').val(),
      due_date: $('#due_date').val()
    }
    addNewTask(data)
  })

  function editTask(id, data) {
    const token = localStorage.getItem('token')
    axios
      .put(`${BASE_URL}/todos/${id}`, data, { headers: { token: token } })
      .then(result => {
        M.toast({
          html: 'Task edited',
          classes: 'yellow darken-2'
        })
        fetchUserTodo()
      })
      .catch(err => {
        const errors = err.response.data.err
        errors.forEach(el => {
          M.toast({
            html: `${err.response.status} | ${el}`,
            classes: 'red darken-2'
          })
        })
      })
  }
  let editId = null

  $(document).on('click', '.edit-todo', function(event) {
    event.preventDefault()
    const form = {
        title: $(this).data('title'),
        description: $(this).data('desc'),
        due_date: $(this).data('date')
    }
    editId = $(this).data('id')
    $('#add-todo').hide()
    $('#add-title').hide()
    $('#edit-title').show()
    $('#edit-btn').show()
    $('#name').val(form.title)
    $('#description').val(form.description)
    $('#due_date').val(new Date(form.due_date).toDateString())
  })

  $(document).on('click', '#edit-btn', function(event) {
      event.preventDefault()
      const form = {
        title: $('#name').val(),
        description: $('#description').val(),
        due_date: $('#due_date').val()
    }
    editTask(editId, form)
    $('#name').val('')
    $('#description').val('')
    $('#due_date').val('')
    $('.modal').modal('close')
  })
})
