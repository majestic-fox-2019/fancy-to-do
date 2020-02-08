$modalbody.on('submit','#addProjectForm',function(e){
  e.preventDefault()
  var name = $modalbody.find('#name').val()
  var due_date = $modalbody.find('#due_date').val()
  addProject(name,due_date)
  
})

function addProject(name,due_date){
  $.ajax(`${urlBase}project`,{
    method : "POST",
    headers : {
      token : localStorage.getItem('token')
    },
    data : {
      name,
      due_date
    }
  })
  .done(function(data){
    loadTodos()
    hideModal()
    makeMessage('Success Add Project')
  })
  .fail(function(err){
    console.log(err)
    var responseJSON = err.responseJSON
    errorFormModal(responseJSON)
  })
}

function loadProjects(){
  $.ajax(`${urlBase}project`,{
    method : "GET",
    headers : {
      token : localStorage.getItem('token')
    }
  })
  .done(function(data){
    projects = data
    makeTableProject()
  })
  .fail(function(err){
    makeMessage("Something Wrong","danger")
  })
}


function editProjectForm(id){
  clearMessage()
  $.ajax(`${urlBase}project/${id}`,{
    method : "GET",
    headers : {
      token : localStorage.getItem('token')
    }
  })
  .done(function(result){
    let data = result.data
    let users = result.users
    generateModal("editProject",id)
    $modalbody.find('#name').val(data.name)
    $modalbody.find('#due_date').val(date(data.due_date))
    var templates = ''
    memberList(data.Users)
    for (var i = 0; i < users.length; i++){
      var template = `<option value="${users[i].id}">${users[i].email}</option>`
      templates += template
    }
    $modalbody.find('#listUserProject').html(templates)
    $modalbody.on('submit',`#editProjectForm${id}`,function(e){
      e.preventDefault()
      var name = $modalbody.find('#name').val()
      var due_date = $modalbody.find('#due_date').val()
      
      editProject(name,due_date,id)
    })
    $modalbody.on('submit',`#editProjectUserForm${id}`,function(e){
      e.preventDefault()
      var userId = $modalbody.find('#listUserProject').val()
      addUserToProject(id,userId)
    })
  })
  .fail(function(err){
    console.log(err)
    
    makeMessage(err.responseJSON.message || "Something Wrong",'danger')
  })

  
}

function editProject(name,due_date,id){
  clearMessage()
  $.ajax(`${urlBase}project/${id}`,{
    method : "PUT",
    headers : {
      token : localStorage.getItem('token')
    },
    data : {
      name,
      due_date
    }
  })
  .done(function(data){
    clearMessage()
    loadProjects()
    hideModal()
    makeMessage('Success Update Project')
  })
  .fail(function(err){
    var responseJSON = err.responseJSON
    errorFormModal(responseJSON)
  })
}

function addUserToProject(id,userId){
  clearMessage()
  $.ajax(`${urlBase}projectuser`,{
    method : "POST",
    headers : {
      token : localStorage.getItem('token')
    },
    data : {
      ProjectId:id,
      UserId: userId
    }
  })
  .done(function(data){
    clearMessage()
    loadProjects()
    hideModal()
    makeMessage('Success Add  User To Project')
  })
  .fail(function(err){
    var responseJSON = err.responseJSON
    errorFormModal(responseJSON)
  })
}

function memberList(users){
  const template = `<tr>
                      <td class="id"></td>
                      <td class="email"></td>
                      <td class="action">
                      
                      </td>
                    </tr>` 
  var deletebtn = `<button type="button" onClick="return confirm('Are you sure to delete ?') ? `
  var $memberList = $('#memberList')

  $memberList.empty()
  if(users){
    for (var i = 0; i < users.length; i++){
      var $item = $(template)
      $item.find('.id').text(users[i].id)
      $item.find('.email').text(users[i].email)
      $item.find('.action').append(deletebtn + `deleteMember(`+ users[i].id + `) : ''" class="btn btn-danger">Delete</button>`)
      $memberList.append($item)
    }
  }
}

function deleteMember(id){
  clearMessage()
  $.ajax(`${urlBase}projectuser/${id}`,{
    method : "DELETE",
    headers : {
      token : localStorage.getItem('token')
    }
  })
  .done(function(data){
    loadProjects()
    hideModal()
    makeMessage('Success Delete Member')
  })
  .fail(function(err){
    makeMessage('Failed Delete',"danger")
  })
}

function deleteProject(id){
  clearMessage()
  $.ajax(`${urlBase}project/${id}`,{
    method : "DELETE",
    headers : {
      token : localStorage.getItem('token')
    }
  })
  .done(function(data){
    loadProjects()
    makeMessage('Success Delete Project')
  })
  .fail(function(err){
    makeMessage('Failed Delete',"danger")
  })
}