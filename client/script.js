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
var $home = $(".homePage")
var $loginPage = $('#loginPage')
var $toLoginPage = $(".toLoginPage")



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

// $loginPage.on("click",function(){
//   display('loginPage')
// })

$toLoginPage.on("click",function(){
  display('loginPage')
})

$home.on("click",function(){
  display('homePage')
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
    console.log(localStorage)
    console.log('success to login')
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
    getList()
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
    getList()
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


function updateTask(id){
  localStorage.removeItem("taskId")
  console.log(id)
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
      console.log(moment(data.due_date).format('LL'))
      $update.find("#due_dateUpdate").val(moment(data.due_date).format('LL'))
      display('updatePage')
      console.log(data)
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
  console.log('yo')
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  auth2.disconnect();
  myFunction()
}


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
  $tableList.empty()
  for (var i = 0; i < data.length; i++){
      var $item = $(template)
      $item.find('.no').text(i+1)
      $item.find('.title').text(data[i].title)
      $item.find('.description').text(data[i].description)
      $item.find('.status').text(data[i].status)
      $item.find('.due_date').text(moment(data[i].due_date).format('LL'))
      $item.find('.action').append(`${updateUrl}${data[i].id})" class="btn btn-danger">Update` + "</button> | ")
      $item.find('.action').append(`${deleteUrl}${data[i].id})" class="btn btn-danger">Delete` + "</button>")
      $tableList.append($item)
  }
}


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
  localStorage.setItem("page", page)
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