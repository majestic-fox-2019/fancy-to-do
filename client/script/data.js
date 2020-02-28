function getUserProjects() {
    // alert('ATAS')
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/projects',
        type: 'get',
        headers: {
            token: localStorage.getItem('token')
        },
        success: function (userProjects) {
            // console.lof(userProjects)
            projectListDisplay(userProjects)
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
              })
        }
    })
}

function getUserTodos() {
    $('#forTodos').hide()
    // alert('test')
    $('#content-spinner').show()
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/todos',
        type: 'get',
        headers: {
            token: localStorage.getItem('token')
        },
        success: function (userTodos) {
            userTodosDisplay('Full', userTodos, false)
        }
    })
}

function getProjectTodo(id, title){
    $('#forTodos').hide()
    $('#content-spinner').show()
    // alert(id, title)
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/todos/project/' + id,
        method: 'get',
        headers: {
            token: localStorage.getItem('token')
        },
        success: function(projectTodo) {
            userTodosDisplay('Complete', projectTodo, title)
        }
    })
}

function getProjectMembers(id) {
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/projects/' + id,
        method: 'get',
        headers: {
            token: localStorage.getItem('token')
        },
        success: function(projectMembers) {
            projectMemberDisplay(projectMembers.members, projectMembers.projectId, projectMembers.owner)
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
              })
        }
    })
}

function changeStatus(id, status){
    Swal.fire({
        title: `Are you sure you want to change this todo to ${status}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Change to ${status}`
      }).then((result) => {
        if (result.value) {
            $.ajax({
                url: 'http://fancy-todo-v2.herokuapp.com/todos/' + id,
                method: 'patch',
                data: {
                    status: status
                },
                headers: {
                    token: localStorage.getItem('token')
                },
                success: function (success) {
                    // alert(success)
                    Swal.fire(
                        'Status Changed!',
                        '',
                        'success'
                      )
                    getUserTodos()
                },
                error: function(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.responseJSON,
                      })
                }
            })
        }
      })
}


function deleteTodo(id) {
    Swal.fire({
        title: 'Are you sure you want to delete this todo?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: 'http://fancy-todo-v2.herokuapp.com/todos/' + id,
            method: 'delete',
            headers: {
                token: localStorage.getItem('token')
            },
            success: function (result) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                getUserTodos()
            },
            error: function(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.responseJSON,
                  })
            }
          })
        }
      })
}

$(document).on('click', '#expired-button', function(e){
    e.preventDefault()
    getAllHistory('Expired')
})

$(document).on('click', '#finished-button', function(e){
    e.preventDefault()
    getAllHistory('Finished')
})

$(document).on('click', '#yourActiveTodo', function(e){
    e.preventDefault()
    getAllHistory('Not Done')
})

function getAllHistory(status) {
    $('#forTodos').hide()
    $('#content-spinner').show()
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/todos/status/' + status,
        method: 'get',
        headers: {
            token : localStorage.getItem('token')
        },
        success: function (userTodos) {
            userTodosDisplay(status, userTodos)
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
              })
        }
    })
}

$(document).on('click', '#submitNewTodo', function(e) {
    e.preventDefault()
    let data = {
        title: $('#todoTitle').val(),
        description: $('#todoDescription').val(),
        due_date: $('#todoDue').val()
    }
    addTodo(data)
})

function addTodo(data) {
    // alert(JSON.stringify(data.description))
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/todos',
        method: 'post',
        data: data
        ,
        headers: {
            token: localStorage.getItem('token')
        },
        success: function(createdTodo) {
            // $('#addNewTodo').hide()
            Swal.fire(
                'Added!',
                'Your Todo has just been added.',
                'success'
              )
            getAllHistory('NotDone')
        title = $('#todoTitle').val('')
        description = $('#todoDescription').val('')
        due_date = $('#todoDue').val('')
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
              })
        }
    })
}

$(document).on('click', '#submitNewProject', function(e) {
    e.preventDefault()
    addProject($('#projectName').val())
    // // if($('#projectMembers').tagsinput('items').length > 0) {
    // //     alert('masuk sini')
    // // addProjectMember($('#projectMembers').tagsinput('items'))
    // // }
})

$(document).on('click', '#submitAddMember', function (){
    // alert($('#addMemberProjectId').val())
    addProjectMember($('#projectEmail').val(), $('#addMemberProjectId').val())
    emailInvitedMember($('#projectEmail').val(), $('#addMemberProjectId').val())
})

function emailInvitedMember(email, projectId) {
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/sendMail/member',
        method: 'post',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            email: email,
            project: projectId
        },
        success: function(success) {
            console.log(success)
        },
        fail: function(err) {
            console.log(err)
        }
    })
}

function addProjectMember(array, projectId) {
    // console.log(array)
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/projects/addMember',
        method: 'post',
        data: {
            userEmail: array,
            projectId: projectId
        },
        headers: {
            token: localStorage.getItem('token')
        },
        success: function(addedMember) {
            $('#projectEmail').val('')
            getProjectMembers(projectId)
            $('.modal-backdrop').hide()
            Swal.fire(
                'Member Added!',
                `${array} has been successfully added to this project!`,
                'success'
              )
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
              })
        }
    })
}

function addProject(title) {
    $.ajax({
        url:'http://fancy-todo-v2.herokuapp.com/projects',
        method: 'post',
        data: {
            name: title
        },
        headers: {
            token: localStorage.getItem('token')
        },
        success: function(addedProject) {
            // alert('success')
            getUserProjects()
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
              })
        }
    })
}

$(document).on('click', '#submitAddProjectTodo', function(e){
    e.preventDefault()
    createProjectTodo({
    title: $('#todoTitle').val(),
    description: $('#todoDescription').val(),
    due_date: $('#todoDue').val()
    })
    
})

function createProjectTodo(data) {
    // console.log(data)
    $.ajax({
        url: 'http://fancy-todo-v2.herokuapp.com/todos/project/' + $('#newProjectTodoId').val(),
        method: 'post',
        data: data,
        headers: {
            token: localStorage.getItem('token')
        },
        success: function (createdProjectTodo) {
            getProjectTodo($('#newProjectTodoId').val(), $('#newProjectTodoTitle').val())
            getProjectMembers($('#newProjectTodoId').val())
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
              })
        }
    })
}

function changeProjectTodoStatus(id, status) {
    Swal.fire({
        title: `Are you sure you want to change this todo to ${status}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Change to ${status}`
      }).then((result) => {
        if (result.value) {
            $.ajax({
                url: 'http://fancy-todo-v2.herokuapp.com/todos/project/' + id,
                method: 'patch',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    status: status
                },
                success: function (changedStatus) {
                    Swal.fire(
                        'Status Changed!',
                        '',
                        'success'
                      )
                    //   alert($('#newProjectTodoTitle').val())
                    getProjectTodo($('#newProjectTodoId').val(), $('#newProjectTodoTitle').val())
                    getProjectMembers($('#newProjectTodoId').val())
                },
                error: function(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.responseJSON,
                      })
                }
            })
        }
      })
}

function deleteProjectTodo(id) {
    Swal.fire({
        title: 'Are you sure you want to delete this todo?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: 'http://fancy-todo-v2.herokuapp.com/todos/project/' + id,
            method: 'delete',
            headers: {
                token: localStorage.getItem('token')
            },
            success: function (result) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                getProjectTodo($('#newProjectTodoId').val(), $('#newProjectTodoTitle').val())
                getProjectMembers($('#newProjectTodoId').val())
            },
            error: function(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.responseJSON,
                  })
            }
          })
        }
      })
}

$(document).on('click', '#submitEditTodo', function(e) {
    e.preventDefault()
    // alert('correct')
    let data = {
        title: $('#todoTitle').val(),
        description: $('#todoDescription').val(),
        due_date: $('#todoDue').val()
    }
    // console.log($('#editTodoid').val())
    editTodo($('#editTodoid').val(), data)
})

function editTodo(id ,data) {
    Swal.fire({
        title: 'Are you sure you want to edit this Todo?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to change it!'
      }).then((result) => {
        if (result.value) {
          $.ajax({
              url: 'http://fancy-todo-v2.herokuapp.com/todos/' + id,
              method: 'put',
              headers: {
                  token: localStorage.getItem('token')
              },
              data: data,
              success: function(editedData) {
                getUserTodos()
                Swal.fire(
                    'Updated!',
                    'Your Todo has been updated.',
                    'success'
                  )
              },
              error: function(err) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: err.responseJSON,
                    })
              }
          })
        }
      })
}

$(document).on('click', '#submitEditProjectTodo', function(e) {
    e.preventDefault()
    let data = {
        title: $('#todoTitle').val(),
        description: $('#todoDescription').val(),
        due_date: $('#todoDue').val()
    }
    // console.log($('#editTodoid').val())
    editProjectTodo($('#editTodoid').val(), data)
})

function editProjectTodo(id ,data) {
    Swal.fire({
        title: 'Are you sure you want to edit this Todo?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to change it!'
      }).then((result) => {
        if (result.value) {
          $.ajax({
              url: 'http://fancy-todo-v2.herokuapp.com/todos/project/' + id,
              method: 'put',
              headers: {
                  token: localStorage.getItem('token')
              },
              data: data,
              success: function(editedData) {
                getUserTodos()
                Swal.fire(
                    'Updated!',
                    'Your Todo has been updated.',
                    'success'
                  )
              },
              error: function(err) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: err.responseJSON,
                    })
              }
          })
        }
      })
}

function leaveGroup(projectId) {
    Swal.fire({
        title: 'Are you sure you want to leave this group?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to leave!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: 'http://fancy-todo-v2.herokuapp.com/projects/member/' + projectId,
                method: 'delete',
                headers: {
                    token: localStorage.getItem('token')
                },
                success: function(result) {
                    $('#for-project-members').html('')
                    Swal.fire(
                        '',
                        'Your have left this Project',
                        'success'
                    )
                    getUserTodos()
                    getUserProjects()
                },
                error: function(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.responseJSON,
                      })
                }
            })
        }
    })
}

function deleteGroup(projectId) {
    Swal.fire({
        title: 'Are you sure you want to delete this group?',
        text: "All of this Project's todo will also be deleted",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to delete this project!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: 'http://fancy-todo-v2.herokuapp.com/projects/' + projectId,
                method: 'delete',
                headers: {
                    token: localStorage.getItem('token')
                },
                success: function(result) {
                    $('#for-project-members').html('')
                    Swal.fire(
                        '',
                        'Your have Deleted this Project',
                        'success'
                    )
                    getUserTodos()
                    getUserProjects()
                },
                error: function(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.responseJSON,
                      })
                }
            })
        }
    })
}