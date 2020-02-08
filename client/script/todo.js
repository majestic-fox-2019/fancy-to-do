function deleteTodo(id){
  clearMessage()
  $.ajax(`${urlBase}todos/${id}`,{
    method : "DELETE",
    headers : {
      token : localStorage.getItem('token')
    }
  })
  .done(function(data){
    loadTodos()
    makeMessage('Success Delete')
  })
  .fail(function(err){
    makeMessage('Failed Delete',"danger")
  })
}

function editTodo(id){
  clearMessage()
  $.ajax(`${urlBase}todos/${id}`,{
    method : "GET",
    headers : {
      token : localStorage.getItem('token')
    }
  })
  .done(function(data){
    generateModal("edit",id)
    
    $modalbody.find('#title').val(data.title)
    $modalbody.find('#description').val(data.description)
    $modalbody.find('#due_date').val(date(data.due_date))
    $modalbody.find(`#status #${data.status}`).attr("selected","selected")

    $modalbody.on('submit',`#editTodoForm${id}`,function(e){
      e.preventDefault()
      var title = $modalbody.find('#title').val()
      var description = $modalbody.find('#description').val()
      var due_date = $modalbody.find('#due_date').val()
      var status = $modalbody.find('#status').val()

      edit(title,description,due_date,status,id)
    })
  })
  .fail(function(err){
    makeMessage('Something Wrong','danger')
  })
}


$modalbody.on('submit','#addTodoForm',function(e){
  e.preventDefault()
  var title = $modalbody.find('#title').val()
  var description = $modalbody.find('#description').val()
  var due_date = $modalbody.find('#due_date').val()
  var event = {
    'summary': title,
    'description': description,
    'start': {
      'dateTime': new Date(),
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': new Date(due_date),
      'timeZone': 'America/Los_Angeles',
    },
  };
  
  add(title,description,due_date,event)
  
})

function loadTodos(){
  $.ajax(`${urlBase}todos`,{
    method : "GET",
    headers : {
      token : localStorage.getItem('token')
    }
  })
  .done(function(data){
    todos = data
    makeTable()
  })
  .fail(function(err){
    makeMessage("Something Wrong","danger")
  })
}

function add(title,description,due_date,event){
  $.ajax(`${urlBase}todos`,{
    method : "POST",
    headers : {
      token : localStorage.getItem('token')
    },
    data : {
      title,
      description,
      due_date
    }
  })
  .done(function(data){
    if(GoogleAuth.currentUser.get()){
      addCalender(event) 
    }
    loadTodos()
    hideModal()
    makeMessage('Success Add')
  })
  .fail(function(err){
    var responseJSON = err.responseJSON
    errorFormModal(responseJSON)
  })
}

function edit(title,description,due_date,status,id){
  clearMessage()
  $.ajax(`${urlBase}todos/${id}`,{
        method : "PUT",
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
          title,
          description,
          due_date,
          status
        }
      })
      .done(function(data){
        clearMessage()
        loadTodos()
        hideModal()
        makeMessage('Success Update')
      })
      .fail(function(err){
        var responseJSON = err.responseJSON
        errorFormModal(responseJSON)
      })
}

