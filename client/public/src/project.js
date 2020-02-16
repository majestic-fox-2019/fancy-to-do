var nonMemberUsers = []
function saveNonMemberUsers(users) {
  nonMemberUsers = []
  users.forEach((user) => {
    nonMemberUsers.push({
      title: user.username, // result title
      description: user.email // result description
    })
  })
}

class Project {
  static getAllProjects() {
    $.ajax({
      type: 'GET',
      url: `${url}/projects/`,
      headers: {
        token: token
      },
      success: function(projects) {
        $('#project-list').empty()
        projects.forEach((project) => {
          $('#project-list').append(Component.projectcards(project))
        })
        $('#projects').show()
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

  static getProjectDetail(projectId) {
    $.ajax({
      type: 'GET',
      url: `${url}/projects/${projectId}/details`,
      headers: {
        token: token
      },
      success: function(projectDetails) {
        $('#project-detail-list').empty()
        $('#project-detail-list').append(
          Component.projectDetailSegment(projectDetails)
        )
        $('#projects').hide()
        $('#project-detail').show()
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

  static create(event) {
    event.preventDefault()
    Swal.fire({
      title: 'Create this project ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: 'POST',
          url: `${url}/projects/`,
          headers: {
            token: token
          },
          data: {
            name: $('input[name="name-create-project"]').val()
          },
          success: function(response) {
            Swal.fire({
              icon: 'success',
              title: 'Project successfully created',
              showConfirmButton: true,
              timer: 1500
            }).then(() => {
              $('input[name="name-create-project"]').val('')
              $('#add-project-modal').modal('hide')
              Project.getAllProjects()
            })
          },
          error: function(err) {
            $('#err-create-project').empty()
            err.responseJSON.forEach((msg) => {
              let error = Component.error(msg)
              $('#err-create-project').append(error)
              $('.error').slideDown('fast')
            })
            setTimeout(() => {
              $('.error').slideUp('fast')
              setTimeout(() => {
                $('#err-create-project').empty()
              }, 300)
            }, 5000)
          }
        })
      }
    })
  }

  static createTodo(event) {
    event.preventDefault()
    const projectId = window.location.hash.substring(9)
    Swal.fire({
      title: 'Are you sure want to add this todo ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: 'POST',
          url: `${url}/todos/projects/${projectId}`,
          headers: {
            token: token
          },
          data: {
            title: $('input[name="title-create-project-todo"]').val(),
            description: $(
              'textarea[name="description-create-project-todo"]'
            ).val(),
            due_date: $('input[name="due_date-create-project-todo"]').val()
          },
          success: function(response) {
            Swal.fire({
              icon: 'success',
              title: 'Todo successfully added',
              showConfirmButton: true,
              timer: 1500
            }).then(() => {
              $('input[name="title-create-project-todo"]').val('')
              $('textarea[name="description-create-project-todo"]').val('')
              $('input[name="due_date-create-project-todo"]').val('')
              $('#add-todo-project-modal').modal('hide')
              const projectId = window.location.hash.substring(9)
              Navigation.toProjectDetail(projectId)
            })
          },
          error: function(err) {
            $('#err-create-project-todo').empty()
            err.responseJSON.forEach((msg) => {
              let error = Component.error(msg)
              $('#err-create-project-todo').append(error)
              $('.error').slideDown('fast')
            })
            setTimeout(() => {
              $('.error').slideUp('fast')
              setTimeout(() => {
                $('#err-create-project-todo').empty()
              }, 300)
            }, 5000)
          }
        })
      }
    })
  }

  static getAllNonMemberUsers(projectId) {
    $.ajax({
      type: 'GET',
      url: `${url}/users/project/${projectId}`,
      async: false,
      success: function(response) {
        saveNonMemberUsers(response)
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

  static addMember(event) {
    event.preventDefault()
    const projectId = window.location.hash.substring(9)
    Swal.fire({
      title: 'Add this user ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      setTimeout(() => {
        if (result.value) {
          $.ajax({
            type: 'POST',
            url: `${url}/projects/${projectId}/invite`,
            headers: {
              token: token
            },
            data: {
              username: $('input[name="add-user-project"]').val()
            },
            success: function(response) {
              Swal.fire({
                icon: 'success',
                title: 'Successfully add member',
                showConfirmButton: true,
                timer: 1500
              }).then(() => {
                $('#add-project-member-modal').modal('hide')
                Project.getProjectDetail(projectId)
              })
            },
            error: function(err) {
              Swal.fire({
                icon: 'error',
                title: err.responseJSON
              })
            }
          })
        }
      }, 1000)
    })
  }

  static join() {
    event.preventDefault()
    const projectId = window.location.hash.substring(9)
    Swal.fire({
      title: 'Join this project ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      setTimeout(() => {
        if (result.value) {
          $.ajax({
            type: 'POST',
            url: `${url}/projects/${projectId}/join`,
            headers: {
              token: token
            },
            success: function(response) {
              Swal.fire({
                icon: 'success',
                title: 'Successfully join project',
                showConfirmButton: true,
                timer: 1500
              }).then(() => {
                Project.getProjectDetail(projectId)
              })
            },
            error: function(err) {
              Swal.fire({
                icon: 'error',
                text: err.responseJSON
              })
            }
          })
        }
      }, 1000)
    })
  }
}
