const localhost = 'http://localhost:3000'
var token = localStorage.getItem('token')
$(document).ready(function() {
  if (!token) {
    $('#frontpage').show()
    $('#homepage').hide()
  } else {
    $('#frontpage').hide()
    $('#homepage').show('fast', function() {
      $('#home').show('fast')
    })
    Homepage.getAllPersonalTodos()
  }

  // show modal
  $('#show-register').on('click', function(event) {
    event.preventDefault()
    Component.showRegister()
  })
})

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    type: 'post',
    url: `${localhost}/users/g-sign-in`,
    data: {
      idToken: id_token
    },
    success: function(res) {
      // console.log(res)
      localStorage.setItem('token', res.token)
      token = localStorage.getItem('token')
      localStorage.setItem('username', res.username)
      localStorage.setItem('platform', res.platform)
      Homepage.getAllPersonalTodos()
      $('#frontpage').fadeOut('fast', function() {
        $('#homepage').fadeIn('fast')
        $('#home').fadeIn('fast')
      })
    },
    fail: function(err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  })
}

class Navigation {
  static toHome() {
    window.location.hash = '#'
    // console.log(window.location.href)
    $('#home').hide()
    $('#project-detail').hide()
    $('#projects').hide('fast', function() {
      $('#loading').show('fast', function() {
        Homepage.getAllPersonalTodos()
        setTimeout(() => {
          $('#loading').fadeOut('fast', function() {
            $('#home').show()
          })
        }, 1000)
      })
    })
    $('.ui.labeled.icon.sidebar').sidebar('hide')
  }

  static toProjects() {
    window.location.hash = '#'
    // console.log(window.location.href)
    $('#projects').hide()
    $('#project-detail').hide()
    $('#home').hide('fast', function() {
      $('#loading').show('fast', function() {
        Project.getAllProjects()
        setTimeout(() => {
          $('#loading').fadeOut('fast', function() {
            $('#projects').show()
          })
        }, 1000)
      })
    })
    $('.ui.labeled.icon.sidebar').sidebar('hide')
  }

  static toProjectDetail(projectId) {
    window.location.hash = 'project-' + projectId
    // console.log(window.location)
    $('#projects').hide('fast', function() {
      $('#loading').show('fast', function() {
        Project.getProjectDetail(projectId)
        setTimeout(() => {
          $('#loading').fadeOut('fast', function() {
            $('#project-detail').show()
          })
        }, 1000)
      })
    })
  }

  static logout(event) {
    event.preventDefault()
    window.location.hash = '#'
    Swal.fire({
      title: 'Are you sure want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        if (localStorage.platform == 'google') {
          localStorage.removeItem('platform')
          const auth2 = gapi.auth2.getAuthInstance()
          auth2.signOut().then(function() {
            console.log('User signed out.')
          })
        }
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        $('#homepage').fadeOut('fast', function() {
          $('#home').hide()
          $('#projects').hide()
          $('#project-detail').hide()
          $('.ui.labeled.icon.sidebar').sidebar('hide')
          window.location.reload()
          $('#frontpage').fadeIn('fast')
        })
      }
    })
  }
}

class Frontpage {
  static login(event) {
    event.preventDefault()
    // Login
    const loginData = {
      email: $('input[name="email-login"]').val(),
      password: $('input[name="password-login"]').val()
    }
    $.ajax({
      type: 'post',
      url: `${localhost}/users/login`,
      data: loginData,
      success: function(res) {
        $('input[name="email-login"]').val('')
        $('input[name="password-login"]').val('')
        localStorage.setItem('token', res.token)
        token = localStorage.getItem('token')
        localStorage.setItem('username', res.username)
        setTimeout(() => {
          Homepage.getAllPersonalTodos()
        }, 500)
        $('#frontpage').fadeOut('fast', function() {
          $('#homepage').fadeIn('fast')
          $('#home').fadeIn('fast')
        })
      },
      error: function(err) {
        let error = Component.error(err.responseJSON)
        $('.err-login').empty()
        $('.err-login').append(error)
        $('.error').slideDown('fast')
        setTimeout(() => {
          $('.error').slideUp('fast')
          setTimeout(() => {
            $('.err-login').empty()
          }, 300)
        }, 5000)
      }
    })
  }

  static register(event) {
    event.preventDefault()
    Swal.fire({
      title: 'Register',
      text: 'Register this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: 'post',
          url: `${localhost}/users/register`,
          data: {
            username: $('input[name="username-register"]').val(),
            email: $('input[name="email-register"]').val(),
            password: $('input[name="password-register"]').val()
          },
          success: function(res) {
            // console.log(res);
            $('.ui.basic.modal').modal('hide')
            $('input[name="username-register"]').val()
            $('input[name="email-register"]').val()
            $('input[name="password-register"]').val()
            localStorage.setItem('token', res.token)
            token = localStorage.getItem('token')
            localStorage.setItem('username', res.username)
            Homepage.getAllPersonalTodos()
            $('#frontpage').fadeOut('fast', function() {
              $('#homepage').fadeIn('fast')
              $('#home').fadeIn('fast')
            })
          },
          error: function(err) {
            console.log(err)
            $('.err-register').empty()
            err.responseJSON.forEach((msg) => {
              let error = Component.error(msg)
              $('.err-register').append(error)
              $('.error').slideDown('fast')
            })
            setTimeout(() => {
              $('.error').slideUp('fast')
              setTimeout(() => {
                $('.err-register').empty()
              }, 300)
            }, 5000)
          }
        })
      }
    })
  }
}

class Homepage {
  static getAllPersonalTodos() {
    $.ajax({
      type: 'GET',
      url: `${localhost}/todos/`,
      headers: {
        token: token
      },
      success: function(todos) {
        // console.log(todos)
        let undone = []
        let doing = []
        let done = []
        $('#personal-todo-undone').empty()
        $('#personal-todo-doing').empty()
        $('#personal-todo-done').empty()

        todos.forEach((todo) => {
          if (todo.status == 'undone') {
            undone = Component.todocards(todo)
            $('#personal-todo-undone').append(undone)
          } else if (todo.status == 'doing') {
            doing = Component.todocards(todo)
            $('#personal-todo-doing').append(doing)
          } else {
            done = Component.todocards(todo)
            $('#personal-todo-done').append(done)
          }
        })

        $('#homepage').show()
      },
      error: function(err) {
        console.log(err.responseJSON)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    })
  }

  static create(event) {
    event.preventDefault()
    Swal.fire({
      title: 'Add this todo ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: 'POST',
          url: `${localhost}/todos/`,
          headers: {
            token: token
          },
          data: {
            title: $('input[name="title-create-todo"]').val(),
            description: $('textarea[name="description-create-todo"]').val(),
            due_date: $('input[name="due_date-create-todo"]').val()
          },
          success: function(response) {
            console.log(response)
            Swal.fire({
              icon: 'success',
              title: 'Todo successfully added',
              showConfirmButton: true,
              timer: 1500
            }).then(() => {
              $('input[name="title-create-todo"]').val('')
              $('textarea[name="description-create-todo"]').val('')
              $('input[name="due_date-create-todo"]').val('')
              Homepage.getAllPersonalTodos()
            })
          },
          error: function(err) {
            // console.log(err.responseJSON)
            $('#err-create-personal-todo').empty()
            err.responseJSON.forEach((msg) => {
              let error = Component.error(msg)
              $('#err-create-personal-todo').append(error)
              $('.error').slideDown('fast')
            })
            setTimeout(() => {
              $('.error').slideUp('fast')
              setTimeout(() => {
                $('#err-create-personal-todo').empty()
              }, 300)
            }, 5000)
          }
        })
      }
    })
  }

  static update(event) {
    event.preventDefault()
    const todoId = $('#update').data('id')
    console.log(todoId)
    Swal.fire({
      title: 'Update todo ?',
      text: 'Are you sure want to update this todo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: 'PUT',
          url: `${localhost}/todos/${todoId}`,
          headers: {
            token: token
          },
          data: {
            title: $('input[name="title-update-todo"]').val(),
            description: $('textarea[name="description-update-todo"]').val(),
            due_date: $('input[name="due_date-update-todo"]').val()
          },
          success: function(response) {
            Swal.fire({
              icon: 'success',
              title: 'Todo updated',
              showConfirmButton: true,
              timer: 1500
            }).then(() => {
              $('#detail-modal').modal('hide')
              const projectId = window.location.hash.substring(9)
              if (window.location.hash.includes('#project')) {
                Project.getProjectDetail(projectId)
              } else {
                Homepage.getAllPersonalTodos()
              }
            })
          },
          error: function(err) {
            $('#err-update-personal-todo').empty()
            if (Array.isArray(err.responseJSON)) {
              err.responseJSON.forEach((msg) => {
                let error = Component.error(msg)
                $('#err-update-personal-todo').append(error)
                $('.error').slideDown('fast')
              })
            } else {
              $('#err-update-personal-todo').append(err.responseJSON)
              $('.error').slideDown('fast')
            }
            setTimeout(() => {
              $('.error').slideUp('fast')
              setTimeout(() => {
                $('#err-update-personal-todo').empty()
              }, 300)
            }, 5000)
          }
        })
      }
    })
  }

  static updateStatus(todoId, status) {
    Swal.fire({
      title: 'Update to ' + status + ' ?',
      text: 'Are you sure want to update this todo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: 'PATCH',
          url: `${localhost}/todos/${todoId}`,
          headers: {
            token: token
          },
          data: {
            status: status
          },
          success: function(response) {
            Swal.fire({
              icon: 'success',
              title: 'Todo updated',
              showConfirmButton: true,
              timer: 1500
            }).then(() => {
              const projectId = window.location.hash.substring(9)
              if (window.location.hash.includes('#project')) {
                Project.getProjectDetail(projectId)
              } else {
                Homepage.getAllPersonalTodos()
              }
            })
          },
          error: function(err) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          }
        })
      }
    })
  }

  static deleteTodo(todoId) {
    // event.preventDefault()
    // const todoId = $('#delete-personal-todo').data('id')
    Swal.fire({
      title: 'Delete todo ?',
      text: 'Are you sure want to delete this todo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: 'DELETE',
          url: `${localhost}/todos/${todoId}`,
          headers: {
            token: token
          },
          success: function(response) {
            Swal.fire({
              icon: 'success',
              title: 'Todo deleted',
              showConfirmButton: true,
              timer: 1500
            }).then(() => {
              $('#detail-modal').modal('hide')
              const projectId = window.location.hash.substring(9)
              if (window.location.hash.includes('#project')) {
                Project.getProjectDetail(projectId)
              } else {
                Homepage.getAllPersonalTodos()
              }
            })
          },
          error: function(err) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          }
        })
      }
    })
  }
}
