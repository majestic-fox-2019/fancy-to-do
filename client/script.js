// const server = 'http://localhost:3000/data'
//assign

var $login = $('#login')
var $addList = $('#addList')
var $taskList = $('#taskList')
var $addProject = $('#addProject')
var $projectList = $('#projectList')
var $registerPageButton = $('#registerPageButton')
var $register = $('#register')
var detailUrl = '<button onClick="projectDetail('
var deleteUrl = '<button onClick="deleteTask('
var updateUrl = '<button onClick="updateTask('
var $update = $('#update')
var $logout = $(".logout")
var $home = $(".homePage")
var $loginPage = $('#loginPage')
var $toLoginPage = $(".toLoginPage")
var $project = $('.project')
var $membersList = $('#membersList')
var $projectData = $('#projectData')
var $addMember = $('#addMember')

//templates
const taskTemplate = `
<tr>
    <th scope="row" class="no"></th>
    <td class="title"></td>
    <td class='description'></td>
    <td class='status'></td>
    <td class='due_date'></td>
    <td class='action'></td>
</tr>`

const projectTemplate = `
<tr>
    <th scope="row" class="no"></th>
    <td class="projectName"></td>
    <td class='description'></td>
    <td class='members'></td>
    <td class='status'></td>
    <td class='due_date'></td>
    <td class='action'></td>
</tr>`

const memberTemplate = `
<tr>
    <th scope="row" class="no"></th>
    <td class="name"></td>
    <td class='email'></td>
</tr>`

//method


$toLoginPage.on("click",function(){
  display('loginPage')
})

$home.on("click",function(){
  display('homePage')
})

$project.on("click",function(){
  display('projectPage')
})

$('#facebook-login-button').on("click",function(e){
  e.preventDefault()
  console.log('wew')
  FB.login(function(response) {
    if (response.status === 'connected') {
      // console.log(response.authResponse.userID)
      FB.api(
        '/'+response.authResponse.userID+'/?fields=id,name,email',
      'GET',
      {},
      function(response) {
        // console.log(response);
        let name = response.name;
        let email = response.email;
        // console.log(email)
        onSignInFacebook(name,email)
      }
    );
      console.log(`Success login to facebook`)
    } else {
      console.log(`Failed login to facebook`)
    }
  }, {scope: 'public_profile,email', auth_type: 'reauthenticate'});
})

$login.on("submit",function(e){
  e.preventDefault()
  let email = $login.find('#loginEmail').val()
  let password = $login.find('#loginPassword').val()
  $.ajax({
    url: "http://localhost:3000/user/login",
    method: "POST",
    data: { 
      email: email,
      password: password
    }
  }) 
  .done((token)=> {
    console.log(token)
    localStorage.setItem("token", token.accessToken)
    display('homePage')
  })
  .fail((err)=> {
    console.log(err.responseText)
    if(err.responseText){
      setTimeout(() => {
        let $error = $("#errorLogin")
        $error.text(JSON.parse(err.responseText).error)
        $error.show()
      }, 1000);
    }
    console.log('failed to login')
  })
})

$logout.on("click",function(e){
  signOut()
})

$update.on("submit",function(e){
  e.preventDefault()
  let title = $update.find('#titleUpdate').val()
  let description = $update.find('#descriptionUpdate').val()
  let status = $update.find('#statusUpdate').val()
  let due_date = $update.find('#due_dateUpdate').val()
  $.ajax({
    url: `http://localhost:3000/todo/${localStorage.taskId}`,
    method: "PUT",
    headers: {token: localStorage.token},
    data: { 
      title: title,
      description: description,
      status: status,
      due_date: due_date
    }
  })
  .done(result=>{
    localStorage.removeItem("taskId")
    console.log('berhasil update')
    display("homePage")
    getTaskList()
    // console.log(result)
  })
  .fail(err=>{
    if(err.responseText){
      setTimeout(() => {
        let $error = $("#errorUpdate")
        $error.text(JSON.parse(err.responseText).errors)
        $error.show()
      }, 1000);
    }
    console.log(err)
    console.log('gagal update')
  })
})

$addMember.on("submit",function(e){
  e.preventDefault()
  let email = $addMember.find('#email').val()
  $.ajax({
    url: `http://localhost:3000/project/addMember`,
    method: "POST",
    headers: {token: localStorage.token},
    data: { 
      id: localStorage.projectId,
      email
    }
  })
  .done(result=>{
    console.log('berhasil add member')
    display("projectDetailPage")
    // console.log(result)
  })
  .fail(err=>{
    if(err.responseText){
      setTimeout(() => {
        let $error = $("#errorAddMember")
        $error.text(JSON.parse(err.responseText).errors)
        $error.show()
      }, 1000);
    }
    console.log(err)
    console.log('gagal add member')
  })
})


$register.on("submit",function(e){
  e.preventDefault()
  let username = $register.find('#usernameRegister').val()
  let email = $register.find('#emailRegister').val()
  let password = $register.find('#passwordRegister').val()
  console.log(username,email,password)
  $.ajax({
    url: "http://localhost:3000/user/register",
    method: "POST",
    headers: {token: localStorage.token},
    data: { 
      username: username,
      email: email,
      password: password
    }
  })
  .done(result=>{
    console.log('berhasil register')
    myFunction()
  })
  .fail(err=>{
    if(err.responseText){
      setTimeout(() => {
        let $error = $("#errorRegister")
        $error.text(JSON.parse(err.responseText).errors)
        $error.show()
      }, 1000);
    }
    console.log('gagal register')
  })
})

$registerPageButton.on("click",function(e){
  e.preventDefault()
  display('registerPage')
})

$addList.on("submit",function(e){
  e.preventDefault()
  console.log('aa')
  let title = $addList.find('#title').val()
  let description = $addList.find('#description').val()
  let status = $addList.find('#status').val()
  let due_date = $addList.find('#due_date').val()
  $.ajax({
    url: "http://localhost:3000/todo",
    method: "POST",
    headers: {token: localStorage.token},
    data: { 
      title: title,
      description: description,
      status: status,
      due_date: due_date
    }
  })
  .done(result=>{
    console.log('berhasil add')
    getTaskList()
  })
  .fail(err=>{
    if(err.responseText){
      setTimeout(() => {
        let $error = $("#errorAdd")
        $error.text(JSON.parse(err.responseText).errors)
        $error.show()
      }, 1000);
    }
    console.log('gagal add')
  })
})

$addProject.on("submit",function(e){
  e.preventDefault()
  console.log('aa')
  let project_name = $addProject.find('#name').val()
  let description = $addProject.find('#description').val()
  let status = $addProject.find('#status').val()
  let due_date = $addProject.find('#due_date').val()
  $.ajax({
    url: "http://localhost:3000/project",
    method: "POST",
    headers: {token: localStorage.token},
    data: { 
      project_name,
      description,
      status,
      due_date
    }
  })
  .done(result=>{
    console.log('berhasil add')
    getProjectList()
  })
  .fail(err=>{
    if(err.responseText){
      setTimeout(() => {
        let $error = $("#errorAddProject")
        $error.text(JSON.parse(err.responseText).errors)
        $error.show()
      }, 1000);
    }
    console.log('gagal add')
  })
})

function updateTask(id){
  localStorage.removeItem("taskId")
  $.ajax({
    method: 'GET',
    headers: {token: localStorage.token},
    url: `http://localhost:3000/todo/${id}`,
  })
    .done((data)=>{
      localStorage.setItem("taskId", data.id)
      $update.find("#titleUpdate").val(data.title)
      $update.find("#descriptionUpdate").val(data.description)
      $update.find("#statusUpdate").val(data.status)
      $update.find("#due_dateUpdate").val(moment(data.due_date).format('LL'))
      display('updatePage')
    })
    .fail(err=>{
      if(err.responseText){
        setTimeout(() => {
          let $error = $("#errorEdit")
          $error.text(JSON.parse(err.responseText).errors)
          $error.show()
        }, 1000);
      }
      console.log(err)
    })
}

function projectDetail(id){
  localStorage.setItem("projectId",id)
  display('projectDetailPage')
}

function getMembersList() {
  let id = localStorage.projectId
  $.ajax({
    url: `http://localhost:3000/project/${id}`,
    method: 'GET',
    headers: {token: localStorage.token},
  })
  .done((data)=>{
      console.log(data,"ini<<<")
      generateMemberList(data)
    })
  .fail(err=>{
    console.log(err)
  })
  console.log('woi')
}

function onSignInFacebook(name, email) {
  $.ajax({
    url: "http://localhost:3000/user/facebook",
    method: "POST",
    data: {
      name,
      email
    }
  })
  .done(result=>{
    // console.log(result,"initoken")
    localStorage.setItem("token", result.accessToken)
    // console.log('berhasil send google token')
    display("homePage")
  })
  .fail(err=>{
    console.log('gagal send google token')
  })
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: "http://localhost:3000/user/google",
    method: "POST",
    data: {token: id_token}
  })
  .done(result=>{
    // console.log(result,"initoken")
    localStorage.setItem("token", result.accessToken)
    // console.log('berhasil send google token')
    display("homePage")
  })
  .fail(err=>{
    console.log('gagal send google token')
  })
}


function signOut() {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    myFunction()

  });
  auth2.disconnect();
  FB.getLoginStatus(function(response) {
    if (response && response.status === 'connected') {
        FB.logout(function(response) {
            // document.location.reload();
            console.log(`logged out from facebook`)
            myFunction()
        });
    }
  });
  myFunction()
}


function generateMemberList(data){
  console.log(data,"inooo")
  console.log(data.project_name)
  $projectData.empty()
  let child = `
              <h6>Project Name:${data.project_name}</h6>
              <h6>Description:${data.description}</h6>
              <h6>Members:${data.members.length}</h6>
              <h6>Status:${data.status}</h6>
              <h6>Due Date:${moment(data.due_date).format('LL')}</h6>
              `
  $projectData.append(child)
  $membersList.empty()
  for (var i = 0; i < data.members.length; i++){
      var $item = $(memberTemplate)
      $item.find('.no').text(i+1)
      $item.find('.name').text(data.members[i].username)
      $item.find('.email').text(data.members[i].email)
      $membersList.append($item)
  }
}

function deleteTask(id){
  console.log('woi')
  $.ajax({
    url: `http://localhost:3000/todo/${id}`,
    method: "DELETE",
    headers: {token: localStorage.token},
  })
  .done(result=>{
    console.log('berhasil delete')
    getTaskList()
  })
  .fail(err=>{
    if(err.responseText){
      setTimeout(() => {
        let $error = $("#errorEdit")
        $error.text(JSON.parse(err.responseText).errors)
        $error.show()
      }, 1000);
    }
    console.log(err)
    console.log('gagal delete')
  })
}
  
function generateList(data){
  $taskList.empty()
  for (var i = 0; i < data.length; i++){
      var $item = $(taskTemplate)
      $item.find('.no').text(i+1)
      $item.find('.title').text(data[i].title)
      $item.find('.description').text(data[i].description)
      $item.find('.status').text(data[i].status)
      $item.find('.due_date').text(moment(data[i].due_date).format('LL'))
      $item.find('.action').append(`${updateUrl}${data[i].id})" class="btn btn-danger">Update` + "</button> | ")
      $item.find('.action').append(`${deleteUrl}${data[i].id})" class="btn btn-danger">Delete` + "</button>")
      $taskList.append($item)
  }
}


function generateProjectList(data){
  $projectList.empty()
  console.log(data[0].UserProjects.length,'<<<<')
  for (var i = 0; i < data.length; i++){
      var $item = $(projectTemplate)
      $item.find('.no').text(i+1)
      $item.find('.projectName').text(data[i].project_name)
      $item.find('.description').text(data[i].description)
      $item.find('.members').text(data[i].UserProjects.length)
      $item.find('.status').text(data[i].status)
      $item.find('.due_date').text(moment(data[i].due_date).format('LL'))
      $item.find('.action').append(`${detailUrl}${data[i].id})" class="btn btn-danger">Details` + "</button>")
      $projectList.append($item)
  }
}

function getTaskList(){
  $.ajax({
    method: 'GET',
    headers: {token: localStorage.token},
    url: "http://localhost:3000/todo",
  })
    .done((data)=>{
      generateList(data)
      console.log(data)
    })
    .fail(err=>{
      console.log(err)
    })
}

function getProjectList(){
  console.log('woi')
  $.ajax({
    method: 'GET',
    headers: {token: localStorage.token},
    url: "http://localhost:3000/project",
  })
    .done((data)=>{
      console.log(data)
      generateProjectList(data)
    })
    .fail(err=>{
      console.log(err)
    })
}

function display(page){
  let pages = ['homePage',"registerPage","updatePage","projectPage","projectDetailPage",'loginPage']
  console.log(page,'<<<<<')
  for(let i = 0; i < pages.length; i++){
    if(pages[i] !== page){
      $(`#${pages[i]}`).hide()
    }else{
      $(`#${pages[i]}`).show()
    }
  }
  localStorage.setItem("page", page)
  if(page == 'homePage'){
    getTaskList()
  }else if(page == 'projectPage'){
    getProjectList()
  }else if(page == "projectDetailPage"){
    getMembersList()
  }
}

function myFunction(){
  console.log(localStorage.page,'<<<')
  if(localStorage.page !== "undefined"){
    display(`${localStorage.page}`)
  }else{
    display(`loginPage`)
  }
}