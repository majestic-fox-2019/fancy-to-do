$(document).ready(function() {})

function fetchUserTodo() {
  const token = localStorage.getItem('token')
  axios
    .get(`${BASE_URL}/todos`, { headers: { token: `${token}` } })
    .then(results => {
      allTodos = results.data
      appendTodos(allTodos)
    })
    .catch(err => {
      appendTodos(allTodos)
      const errors = err.response.data.err
      errors.forEach(el => {
        M.toast({
          html: `${err.response.status} | ${el}`,
          classes: 'red darken-2'
        })
      })
    })
}

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
      const errors = err.response.data.err
      errors.forEach(el => {
        M.toast({
          html: `${err.response.status} | ${el}`,
          classes: 'red darken-2'
        })
      })
    })
}

function addNewTask(data) {
  const token = localStorage.getItem('token')
  Swal.showLoading()
  axios
    .post(`${BASE_URL}/todos`, data, { headers: { token: token } })
    .then(result => {
      Swal.close()
      allTodos.push(result.data)
      M.toast({
        html: 'New task added',
        classes: 'blue darken-3'
      })
      $('#modal-task').modal('close')
      $('#name').val('')
      $('#description').val('')
      $('#due_date').val('')
      projectId = null
      appendTodos(allTodos)
    })
    .catch(err => {
      Swal.close()
      const errors = err.response.data.err
      errors.forEach(el => {
        M.toast({
          html: `${err.response.status} | ${el}`,
          classes: 'red darken-2'
        })
      })
    })
}

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

function fetchUserProjects() {
  $('#myProjects').html('')
  const token = localStorage.getItem('token')
  axios
    .get(`${BASE_URL}/projects/my-projects`, { headers: { token: token } })
    .then(results => {
      myProjects = results.data
      appendProjects(myProjects)
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
      allTodos = result.data.todos
      appendTodos(allTodos)
    })
}

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
      fetchUserTodo()
    })
    .catch(err => {
      M.toast({
        html: 'Error',
        classes: 'red lighten-1'
      })
    })
}

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

function showInvitations() {
  const token = localStorage.getItem('token')
  axios
    .get(`${BASE_URL}/projects/user/invitation`, { headers: { token: token } })
    .then(results => {
      let data = results.data
      console.log(data)
      data.forEach(el => {
        $('#invitations').append(`
                    <div class="card-panel teal lighten-2" style="border-radius: 10px;" id="${el.ProjectId}">
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

function acceptProject(id, data) {
  const token = localStorage.getItem('token')
  axios
    .patch(`${BASE_URL}/projects/status/${id}`, data, {
      headers: { token: token }
    })
    .then(result => {
      M.toast({
        html: 'You accepted the invitation, welcome',
        classes: 'green darken-1'
      })
      fetchUserProjects()
      showInvitations()
      $(`#${id}`).hide()
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

function leaveProject(id) {
  const token = localStorage.getItem('token')
  axios
    .delete(`${BASE_URL}/projects/user/${id}`, { headers: { token: token } })
    .then(res => {
      M.toast({
        html: 'You leave the project',
        classes: 'red darken-1'
      })
      fetchUserProjects()
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
