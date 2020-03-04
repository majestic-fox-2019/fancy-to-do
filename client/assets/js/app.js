var todo = function() {
  const base_url = 'http://localhost:3000'

  var divLoginRegist = $('#login-regist')
  var divLoginForm = $('#login-form')
  var divRegisterForm = $("#register-form")
  var divTodoList = $('#todolist')

  var tabLogin = $('#login-form-link')
  var tabRegister = $('#register-form-link')

  var usersHeader = $("#navbarDropdown")

  var emailLogin = $("#email-login")
  var passLogin = $("#password-login")

  var emailRegist = $("#email-regist")
  var passRegist = $("#password-regist")

  var titleAdd = $("#title-add")
  var descriptionAdd = $("#description-add")
  var due_dateAdd = $("#due_date-add")

  var idEdit = $("#idEdit")
  var titleEdit = $("#title-edit")
  var statusEdit = $("#status-edit")
  var descriptionEdit = $("#description-edit")
  var due_dateEdit = $("#due_date-edit")

  var rowTodoTable = $("#todoBody")
  var dataNoRecords = $("#dataNoRecords")

  var doLogout = $("#doLogout")
  var doLogin = $("#login-form")
  var doRegister = $("#register-form")
  var addTodo = $("#addTodo")
  var editTodo = $("#editTodo")

  var modalAddTodo = $("#addTodo")
  var modalEditTodo = $("#editTodo")

  var alertMessage = $("#alert-message")

  startSet()

  // SUBMIT FORM ---------------------
  doLogin.on('submit', function(e){
    e.preventDefault()
    clearErrorForm(doLogin)
    let email = emailLogin.val()
    let pass = passLogin.val()
    $.ajax({
      method: 'POST',
      url: `${base_url}/users/login`,
      data: { 
        email: email,
        password: pass
      }
    })
    .done(res => {
      let email = emailLogin.val()
      localStorage.setItem('token', res.Token)
      localStorage.setItem('email', email)
      usersHeader.text(localStorage.getItem('email'))
      clearForm(doLogin)
      showAlert()
      successAlert()
      clearAlert()
      startSet()
      getData()
    })
    .fail(err => {
      errorMessage(JSON.parse(err.responseText), 'login')
      showAlert()
      errorAlert()
      clearAlert()
      startSet()
    })
  })

  doRegister.on('submit', function(e){
    e.preventDefault()
    clearErrorForm(doRegister)
    let email = emailRegist.val()
    let pass = passRegist.val()
    $.ajax({
      method: 'POST',
      url: `${base_url}/users`,
      data: { 
        email: email,
        password: pass
      }
    })
    .done(res => {
      clearForm(doRegister)
      showAlert()
      successAlert()
      clearAlert()
      tabRegister.removeClass('active');
      startSet()
    })
    .fail(err => {
      errorMessage(JSON.parse(err.responseText), 'regist')
      showAlert()
      errorAlert()
      clearAlert()
    })
  })

  addTodo.on('submit', function(e){
    e.preventDefault()
    clearErrorForm(addTodo)
    let title = titleAdd.val()
    let description = descriptionAdd.val()
    let due_date = due_dateAdd.val()
    $.ajax({
      method: 'POST',
      url: `${base_url}/todos`,
      data: { 
        title: title,
        description: description,
        due_date: due_date
      },
      headers: {
        Bearer : localStorage.getItem('token')
      }
    })
    .done(res => {
      modalAddTodo.modal('hide')
      clearForm(addTodo)
      getData()
    })
    .fail(err => {
      errorMessage(JSON.parse(err.responseText), 'add')
    })
  })

  editTodo.on('submit', function(e){
    e.preventDefault()
    clearErrorForm(editTodo)
    let dataEdit = {
      title: titleEdit.val(),
      description: descriptionEdit.val(),
      status: statusEdit.val(),
      due_date: due_dateEdit.val()
    }
    $.ajax({
      method: "PUT",
      url: `${base_url}/todos/${idEdit.val()}`,
      data: dataEdit,
      headers: {
        Bearer : localStorage.getItem('token')
      },
    })
    .done(res => {
      modalEditTodo.modal('hide')
      getData()
    })
    .fail(err => {
      errorMessage(JSON.parse(err.responseText), 'edit')
    })
  })

  // CLICK ALL ---------------------
  doLogout.on('click', function(e) {
    e.preventDefault()
    if(localStorage.getItem('type')){
      signOutGoogle()
    }
    localStorage.clear()
    startSet()
  })

  tabLogin.click(function(e) {
    divLoginForm.delay(80).fadeIn(80);
    divRegisterForm.fadeOut(80);
    tabRegister.removeClass('active');
    $(this).addClass('active');
    clearForm(divLoginForm)
    e.preventDefault();
  });
  
  tabRegister.click(function(e) {
    divRegisterForm.delay(80).fadeIn(80);
    divLoginForm.fadeOut(80);
    tabLogin.removeClass('active');
    $(this).addClass('active');
    clearForm(divRegisterForm)
    clearErrorForm(doRegister)
    e.preventDefault();
  });

  // ALL FUNCTION ---------------------
  function startSet(){
    if(!localStorage.getItem('token')){
      divTodoList.hide()
      divRegisterForm.hide()
      divLoginRegist.show()
      divLoginForm.show()
    }else{
      divLoginRegist.hide()
      divTodoList.show()
      usersHeader.text(localStorage.getItem('email'))
      getData()
    }
  }

  function errorMessage(err, slug){
    alertMessage.empty()
    for(let key in err){
      $(`#${key}-${slug}`).addClass('is-invalid')
      $(`.${key}-${slug}`).text(err[key])
      alertMessage.append(`<div class="content-alert">Failed! ${err[key]}</div>`)
    }
  }

  function findTodo(id){
    clearForm(editTodo)
    let token = localStorage.getItem('token')
    $.ajax({
      method: "GET",
      url: `${base_url}/todos/${id}`,
      headers: {
        Bearer : token
      }
    })
    .done(res => {
      idEdit.val(res.id)
      titleEdit.val(res.title)
      descriptionEdit.val(res.description)
      if(res.status === 1){
        $("#completeEdit").attr("selected", "selected")
      }else{
        $("#uncompleteEdit").attr("selected", "selected")
      }
      due_dateEdit.val(formatDate(res.due_date))
    })
  }

  function deleteTodo(id){
    let token = localStorage.getItem('token')
    $.ajax({
      method: "DELETE",
      url: `${base_url}/todos/${id}`,
      data: {},
      headers: {
        Bearer : token
      }
    })
    .done(res => {
      getData()
    })
  }

  function getData(){
    $.ajax({
      method: "GET",
      url: `${base_url}/todos`,
      headers: {
        Bearer : localStorage.getItem('token')
      },
    })
    .done(res => {
      emptyData()
      setData(res)
    })
    .fail(err => {
      divTodoList.hide()
    })
  }

  function setData(data){
    if(data.length === 0){
      rowTodoTable.append(
        `<tr id="dataNoRecords">
          <td colspan="6" class="text-center p-nodata">NO DATA</td>
        </tr>`
      )
    }else{
      data.map((el, index) => {
        rowTodoTable.append(
        `<tr>
          <td>${index+=1}</td>
          <td>${el.title}</td>
          <td>${el.description}</td>
          <td class="${el.status === 1 ? 'complete' : 'uncomplete'}">${el.status === 1 ? 'Complete' : 'Uncomplete'}</td>
          <td>${formatDate(el.due_date)}</td>
          <td>
            <button class="btn btn-warning" onclick="findTodo(${el.id})" data-toggle="modal" data-target="#editTodo"><i class="fa fa-pencil"></i></button>
            <button class="btn btn-danger" onclick="deleteTodo(${el.id})"><i class="fa fa-trash"></i></button>
          </td>
        </tr>`
        )
      })
    }
  }

  function emptyData(){
    rowTodoTable.empty()
  }

  function onSignIn(googleUser) {
    var ticket = googleUser.getBasicProfile();
    // ID => profile.getId() Name => profile.getName() Image URL => profile.getImageUrl() Email => profile.getEmail()
    $.ajax({
      method: "POST",
      url: `${base_url}/users/login/gsignin`,
      data: {
        email: ticket.getEmail()
      }
    })
    .done(res => {
      localStorage.setItem('token', res.Token)
      localStorage.setItem('email', ticket.getEmail())
      localStorage.setItem('type', 'google')
      usersHeader.text(localStorage.getItem('email'))
      showAlert()
      successAlert()
      clearAlert()
      startSet()
      getData()
    })
    .fail(err => {
      showAlert()
      errorAlert()
      clearAlert()
    })
  }
  
  function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('Anda berhasil sign out');
    });
  }

  function formatDate(date){
    if(date === null){
      return date
    }else{
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear()

          if(month.length < 2) month = '0' + month
          if(day.length < 2) day = '0' + day

          return [year, month, day].join('-')
    }
  }

  function clearForm(inputed){
    inputed.find('input').val("")
    inputed.find('textarea').val("")
    inputed.find('option:selected').prop("selected", false)
  }

  function clearErrorForm(inputed){
    inputed.find('input').removeClass("is-invalid")
    inputed.find('textarea').removeClass("is-invalid")
    inputed.find('option:selected').removeClass("is-invalid")
  }

  return ({
    onSignIn: onSignIn,
    findTodo: findTodo,
    deleteTodo: deleteTodo
  })
}();

function onSignIn(googleUser) {
  todo.onSignIn(googleUser);
}

function findTodo(id){
  todo.findTodo(id)
}

function deleteTodo(id){
  todo.deleteTodo(id)
}