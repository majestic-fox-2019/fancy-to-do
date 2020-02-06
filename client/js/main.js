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
  $('.collapsible').collapsible()

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
    $('#welcome').empty()
    showHome()
    M.toast({ html: `Logout success`, classes: 'green lighten-1' })
  })

  function login(form) {
    axios
      .post(`${BASE_URL}/users/login`, form)
      .then(result => {
        console.log(result.data.result.email)
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('id', result.data.result.id)
        $('#email-login').val('')
        $('#password-login').val('')
        closeHome()
        fetchUserTodo()
        $('#loginModal').modal('close')
        $('#welcome').append(`<h5>Hello, ${result.data.result.email}</h5>`)
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

  $(document).on('click', '#my-todos', function(event) {
    event.preventDefault()
    $('#showModalAdd').show()
    fetchUserTodo()
  })

  function register(form) {
    console.log(form)
    axios
      .post(`${BASE_URL}/users/register`, form)
      .then(result => {
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('id', result.data.result.id)
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

  var expired = []

  function fetchUserTodo() {
    $('#todo-item').html('')
    expired = []
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
            expired.push(el)
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
        projectId = null
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

  function showAddForm() {
    $('#add-todo').show()
    $('#add-title').show()
    $('#edit-title').hide()
    $('#edit-btn').hide()
    $('#name').val('')
    $('#description').val('')
    $('#due_date').val('')
  }

  function showEditForm() {
    $('#add-todo').hide()
    $('#add-title').hide()
    $('#edit-title').show()
    $('#edit-btn').show()
  }

  let projectId = null

  $(document).on('click', '#showModalAdd', function(event) {
    event.preventDefault()
    showAddForm()
  })

  $(document).on('click', '#add-todo', function(event) {
    console.log(projectId)
    event.preventDefault()
    const data = {
      title: $('#name').val(),
      description: $('#description').val(),
      due_date: $('#due_date').val()
    }
    if (projectId !== null) {
      data['project_id'] = projectId
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
        showAddForm()
        $('.modal').modal('close')
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
    showEditForm()
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
  })

  function fetchUserProjects() {
    $('#myProjects').empty()
    const token = localStorage.getItem('token')
    axios
      .get(`${BASE_URL}/projects/my-projects`, { headers: { token: token } })
      .then(results => {
        console.log(results)
        results.data.forEach(el => {
          $('#myProjects').append(` 
                <li>
                      <div class="collapsible-header see-detail" data-id=${el.ProjectId}><i class="material-icons">folder_shared</i>${el.Project.name}</div>
                      <div class="collapsible-body project-detail"></div>
                </li>
                `)
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  fetchUserProjects()
  function fetchDetailProject(id) {
    $('.project-detail').empty()
    const token = localStorage.getItem('token')
    axios
      .get(`${BASE_URL}/projects/${id}`, { headers: { token: token } })
      .then(result => {
        $('.project-detail').append('<h5> Members List </h5>')
        result.data.data.members.forEach(el => {
          $('.project-detail').append(`
                   <span>${el}</span><br>
                `)
        })
        $('.project-detail').append(
          `<a href="#modal-task" class="modal-trigger waves-effect waves-light btn blue darken-2 create-task-project" data-id=${result.data.data.id}>Create Task</a>
          <a href="#modal-task" class="waves-effect waves-light btn red darken-2 decline" data-id=${result.data.data.id}>Leave Project</a>`
        )
        if (result.data.data.owner == localStorage.getItem('id')) {
          $('.project-detail').append(`
                     <a class="waves-effect waves-light btn red darken-1 delete-project" data-id=${result.data.data.id}>Delete Project</a>
                     <a href="#inviteModal" class="modal-trigger waves-effect waves-light btn green lighten-1 invite-member" data-id=${result.data.data.id}>Invite Members</a>
                     `)
        }
        $('#todo-item').empty()
        var cardColor
        let today = new Date()
        if (result.data.todos.length == 0) {
          $('#todo-item').append(
            '<h4 class="animated fadeIn">Sorry you dont have any todos in this project</h4>'
          )
        }
        result.data.todos.forEach(el => {
          let date = new Date(el.due_date)
          if (el.status == 'done') {
            cardColor =
              '<div class="card green lighten-1 white-text fadeIn delay-1s animated hoverable">'
          } else if (today > date) {
            cardColor =
              '<div class="card red lighten-1 white-text fadeIn delay-1s animated hoverable">'
            expired.push(el)
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
  }

  $(document).on('click', '.see-detail', function(event) {
    event.preventDefault()
    const id = $(this).data('id')
    fetchDetailProject(id)
  })

  function createProject(form) {
    const token = localStorage.getItem('token')
    axios
      .post(`${BASE_URL}/projects`, form, { headers: { token: token } })
      .then(result => {
        M.toast({
          html: 'New project created',
          classes: 'green lighten-1'
        })
        $('#projectModal').modal('close')
        fetchUserProjects()
      })
      .catch(err => {
        M.toast({
          html: `${err.response.status}`,
          classes: 'red lighten-1'
        })
      })
  }

  $(document).on('click', '#projectCreate', function(event) {
    event.preventDefault()
    const form = {
      name: $('#project-name').val()
    }
    createProject(form)
  })

  function deleteProject(id) {
    const token = localStorage.getItem('token')
    axios
      .delete(`${BASE_URL}/projects/${id}`, { headers: { token: token } })
      .then(result => {
        M.toast({
          html: 'Project Deleted',
          classes: 'red lighten-1'
        })
        fetchUserProjects()
      })
      .catch(err => {
        M.toast({
          html: 'Error',
          classes: 'red lighten-1'
        })
      })
  }

  $(document).on('click', '.delete-project', function(event) {
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
        deleteProject(id)
      }
    })
  })

  function inviteMember(id, form) {
    const token = localStorage.getItem('token')
    axios
      .post(`${BASE_URL}/projects/invite/${id}`, form, {
        headers: { token: token }
      })
      .then(result => {
        M.toast({
          html: 'User invited',
          classes: 'green lighten-1'
        })
        projectId = null
        fetchDetailProject(id)
        $('#inviteModal').modal('close')
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

  $(document).on('click', '.see-detail', function(event) {
    event.preventDefault()
    $('#showModalAdd').hide()
  })

  $(document).on('click', '.invite-member', function(event) {
    event.preventDefault()
    projectId = $(this).data('id')
  })

  $(document).on('click', '#inviteMember', function(event) {
    event.preventDefault()
    const form = {
      email: $('#user-email').val()
    }
    inviteMember(projectId, form)
  })

  $(document).on('click', '.create-task-project', function(event) {
    event.preventDefault()
    projectId = $(this).data('id')
  })

  function showInvitations() {
    const token = localStorage.getItem('token')
    axios.get(`${BASE_URL}/projects/user/invitation`, {headers: {token: token}})
      .then(results => {
        let data = results.data
        console.log(data)
        data.forEach(el => {
          $('#invitations').append(`
                    <div class="card-panel teal lighten-2" style="border-radius: 10px;">
                        <div class="row">
                            <div class="col m6 white-text">
                                <h5>New Invitation from: ${el.Project.name} Project</h5>
                            </div>
                            <div class="col m6 right-align">
                                <a href="#" data-id=${el.ProjectId} class="btn green accept">Accept</a>
                                <a href="#" data-id=${el.ProjectId} class="btn red decline">Decline</a>
                            </div>
                        </div>
                    </div>
          `)
        })
      })
  }

  function acceptProject(id, data) {
    const token = localStorage.getItem('token')
    axios.patch(`${BASE_URL}/projects/status/${id}`, data, {headers: {token: token}})
      .then(result => {
        console.log(result)
        M.toast({
          html: 'You accepted the invitation, welcome',
          classes: 'green darken-1'
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  function leaveProject(id) {
    const token = localStorage.getItem('token')
    axios.delete(`${BASE_URL}/projects/user/${id}`, {headers: {token: token}})
      .then(res => {
        M.toast({
          html: 'You leave the project',
          classes: 'red darken-1'
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  $(document).on('click', '.accept', function(event) {
    event.preventDefault()
    let id = $(this).data('id')
    console.log(id)
    let data = {status: 'join'}
    acceptProject(id, data)
  })

  $(document).on('click', '.decline', function(event) {
    event.preventDefault()
    let id = $(this).data('id')
    leaveProject(id)
  })

  showInvitations()
})
