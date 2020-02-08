$(document).ready(function() {
  if (localStorage.getItem('token')) {
    closeHome()
    fetchUserTodo()
    showInvitations()
    fetchUserProjects()
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

  // Logout Button

  $(document).on('click', '#logout-btn', function(event) {
    event.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then(result => {
      if (result.value) {
        var auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut().then(function() {
          console.log('User signed out.')
        })
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        allTodos = []
        myProjects = []
        expired = []
        projectId = null
        editId = null
        $('#welcome').empty()
        $('loginModal').modal('close')
        showHome()
        M.toast({ html: `Logout success`, classes: 'green lighten-1' })
      }
    })
  })

  $(document).on('click', '#login', function(event) {
    event.preventDefault()
    const form = {
      email: $('#email-login').val(),
      password: $('#password-login').val()
    }
    login(form)
  })

  $(document).on('click', '#loginGithub', function(event) {
    event.preventDefault()
    githubLogin()
  })

  $(document).on('click', '#my-todos', function(event) {
    event.preventDefault()
    $('#showModalAdd').show()
    projectId = null
    fetchUserTodo()
  })

  $(document).on('click', '#expired-todos', function(event) {
    event.preventDefault()
    expiredTodos(expired)
  })

  $(document).on('click', '#register', function(event) {
    event.preventDefault()
    const form = {
      email: $('#email').val(),
      password: $('#password').val()
    }
    register(form)
  })

  $('.collection-item').on('click', function(event) {
    event.preventDefault()
    $('.active').removeClass('active')
    $(this).addClass('active')
  })

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

  $(document).on('click', '.see-detail', function(event) {
    event.preventDefault()
    const id = $(this).data('id')
    fetchDetailProject(id)
  })

  $(document).on('click', '#projectCreate', function(event) {
    event.preventDefault()
    const form = {
      name: $('#project-name').val()
    }
    createProject(form)
  })

  $(document).on('click', '.delete-project', function(event) {
    event.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete this project!'
    }).then(result => {
      if (result.value) {
        const id = $(this).data('id')
        deleteProject(id)
      }
    })
  })

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

  $(document).on('click', '.accept', function(event) {
    event.preventDefault()
    let id = $(this).data('id')
    console.log(id)
    let data = { status: 'join' }
    acceptProject(id, data)
  })

  $(document).on('click', '.decline', function(event) {
    event.preventDefault()
    let id = $(this).data('id')
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then(result => {
      if (result.value) {
        leaveProject(id)
        $(`#${id}`).hide()
      }
    })
  })
})
