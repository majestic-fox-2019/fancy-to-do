// const server = 'http://localhost:3000/data'
//assign
var $login = $('#login')
var $addList = $('#addList')
var $tableList = $('#tableList')
var $registerPageButton = $('#registerPageButton')
var $register = $('#register')
var deleteUrl = `<button onClick="deleteTask(`
var updateUrl = `<button onClick="updateTask(`
var $update = $('#update')
var $logout = $(".logout")
var $home = $(".home")



//template
const template = `
<tr>
    <th scope="row" class="no"></th>
    <td class="title"></td>
    <td class='description'></td>
    <td class='status'></td>
    <td class='due_date'></td>
    <td class='action'></td>
</tr>`

//method
$home.on("click",function(){
  console.log('oi')
  display('login')
})

function updateTask(id){
  localStorage.setItem("page", "updatePage")
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
      $update.find("#due_dateUpdate").val(data.due_date)
      display('updatePage')
      console.log(data)
    })
    .fail(err=>{
      console.log(err)
    })
}

function onSignIn(googleUser) {
  console.log('oo')
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(profile)
  console.log(id_token)
  $.ajax({
    url: "http://localhost:3000/user/google",
    method: "POST",
    data: {token: id_token}
  })
  .done(result=>{
    console.log('berhasil send google token')
  })
  .fail(err=>{
    console.log('gagal send google token')
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  auth2.disconnect();
}

$logout.on("click",function(e){
  localStorage.clear()
  display('login')
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
    getList()
    // console.log(result)
  })
  .fail(err=>{
    console.log(err)
    console.log('gagal update')
  })
})

function deleteTask(id){
  $.ajax({
    url: `http://localhost:3000/todo/${id}`,
    method: "DELETE",
    headers: {token: localStorage.token},
  })
  .done(result=>{
    console.log('berhasil delete')
    getList()
    // console.log(result)
  })
  .fail(err=>{
    console.log(err)
    console.log('gagal delete')
  })
}
  
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
    display('homePage')
    // console.log(result)
  })
  .fail(err=>{
    console.log('gagal add')
  })
})

$registerPageButton.on("click",function(e){
  localStorage.setItem("page", "registerPage")
  e.preventDefault()
  display('registerPage')
})
        
function generateList(data){
  $tableList.empty()
  for (var i = 0; i < data.length; i++){
      var $item = $(template)
      $item.find('.no').text(i+1)
      $item.find('.title').text(data[i].title)
      $item.find('.description').text(data[i].description)
      $item.find('.status').text(data[i].status)
      $item.find('.due_date').text(data[i].due_date)
      $item.find('.action').append(`${updateUrl}${data[i].id})" class="btn btn-danger">Update` + "</button> | ")
      $item.find('.action').append(`${deleteUrl}${data[i].id})" class="btn btn-danger">Delete` + "</button>")
      $tableList.append($item)
  }
}

$addList.on("submit",function(e){
  e.preventDefault()
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
    getList()
    // console.log(result)
  })
  .fail(err=>{
    console.log('gagal add')
  })
})

$login.on("submit",function(e){
  e.preventDefault()
  let email = $login.find('#loginEmail').val()
  let password = $login.find('#loginPassword').val()
  // console.log(email,password)
  $.ajax({
    url: "http://localhost:3000/user/login",
    method: "POST",
    data: { 
      email: email,
      password: password
    }
  }) 
  .done(function(token) {
    console.log(token)
    localStorage.setItem("token", token.accessToken)
    localStorage.setItem("page", "homePage")
    console.log(localStorage)
    console.log('success to send request')
    display('homePage')
  })
  .fail(function( jqXHR, textStatus ) {
    console.log(jqXHR.responseText)
    console.log('failed to send request')
  })
})

function getList(){
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

function display(page){
  let pages = ['loginPage','homePage',"registerPage","updatePage"]
  for(let i = 0; i < pages.length; i++){
    if(pages[i] !== page){
      $(`#${pages[i]}`).hide()
    }else{
      $(`#${pages[i]}`).show()
    }
  }
  if(page == 'homePage'){
    getList()
  }
}

function myFunction(){
  console.log(localStorage.token, localStorage.page)
  if(localStorage.page){
    display(`${localStorage.page}`)
  }else{
    display(`loginPage`)
  }
}