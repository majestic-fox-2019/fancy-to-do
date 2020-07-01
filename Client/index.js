
var submitForm = $('.containerRegis')
var loginForm = $('#loginForm')
var showRegis = $('#showRegis')
var Login= $('.containerLogin')
var masuk = $('#masuk')
const server = 'http://localhost:3000'
var logout = $('#logout')
var belumMasuk = $('#belumMasuk')
// Swal
submitForm.hide()
// logout.hide()
if(!localStorage.getItem('token')){
    belumMasuk.show()
    masuk.hide()
    $('.container').show()
}
else{
    // registration.hide()
    Login.hide()
    // belumMasuk.hide()
    showToDoList()
    masuk.show()
    $('.container').hide()
}


var register = function(username,password,email,name){
    $.ajax({
        method: 'POST',
        url:`${server}/register`,
        // contentType: "application/json; charset=utf-8",
        data:
        {
            username:username,
            name: name,
            email:email,
            password:password,

        }
         // this
    })
    .done(function(data){
        submitForm.hide()
        Login.show()
        // console.log('masuk cuy')
    })
    .fail(error=> {
        // console.log(JSON.parse(error.responseText))
        let msg = JSON.parse(error.responseText)
        console.log(msg)
        Swal.fire({
            icon: "error",
          title: "Oops...",
          text: `${msg.message}`
        })
    })
    
}

logout.on('click',function (e) {
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    Login.show()
    masuk.hide()
    belumMasuk.show()
})

var login = function(email,password){ 
    $.ajax({
        method: 'POST',
        url:`${server}/login`,
        // contentType: "application/json; charset=utf-8",
        data:
        {
            email:email,
            password:password,

        }
         // this
    })
    .done(function(data){
        // console.log(data)
        localStorage.setItem("token",data)
        belumMasuk.hide()
        showToDoList()
        masuk.show()
    })
    .fail(function(error) {
        let msg = JSON.parse(error.responseText)
        Swal.fire({
            icon: "error",
          title: "Oops...",
          text: "Periksa kembali Email atau Password Anda"
        })
        // console.log(msg)
    })
}

showRegis.on('click',function(e){
    submitForm.show()
    Login.hide()

})
$('#showLogin').on('click',function(e){
    submitForm.hide()
    Login.show()
})

submitForm.on('submit',function(e){
    e.preventDefault()
    var name = $('#name').val()
    var username = $('#username').val()
    var email = $('#email').val()
    var password = $('#password').val()
    register(username,password,email,name)
})

loginForm.on('submit',function(e){
    e.preventDefault()
    var email = $('#emailLogin').val()
    var password = $('#passwordLogin').val()
    login(email,password)
})


var tbody = $('#tbodies')

var template = ` <tr>
                    <td class = "id"></td>
                    <td class = "title"></td>
                    <td class = "description"></td>
                    <td class = "status"></td>
                    <td class = "due_date"></td>
                    <td class = "temperature"></td>
                    <td class ="delete">
                        <a id="deletetodo" class ="btn btn-primary btn-danger" role="button">delete</a>
                        <a id="updatetodo" class ="btn btn-primary btn-primary" role="button" data-toggle="modal" data-target ="#updateModal">update</a></td>
                </tr>`

function showTemplate(data){
    tbody.empty()
    for(let i = 0; i < data.length;i++){
        // console.log(data)
        var $item = $(template)
        $item.find('.id').text(data[i].id)
        $item.find('.title').text(data[i].title)
        $item.find('.description').text(data[i].description)
        $item.find('.status').text(data[i].status)
        $item.find('.due_date').text(`${new Date(data[i].due_date).toISOString().substr(0,10)}`)
        $item.find('.temperature').text(data[i].temperature)
        $item.find('#deletetodo').prop('href',`${server}/todos/${data[i].id}`)
        $item.find('#updatetodo').prop('href',`${server}/todos/${data[i].id}`)
        // $('#editTodo').prop('href',`${server}/todos/${data[i].id}`)

        tbody.append($item)
        // console.log($item)
    }
    // console.log(tbody)
}

function showToDoList(){
    return $.ajax({
        method:'GET',
        url:`${server}/todos`,
        headers:{
            token:localStorage.token
        }
    })
    .done(function(data){
        // console.log('masuk')
        // console.log(data)
        showTemplate(data)
    })
    .fail(function(error){
        console.log(error)
    })
}

var Todo = $('#addForm')
Todo.on('submit',function(e){
    e.preventDefault()
    var title = $('#titleAdd').val()
    var description = $('#descriptionAdd').val()
    var status = $('#statusAdd').val()
    var due_date = $('#due_dateAdd').val()
    addTodo(title,description,status,due_date)
})

var addTodo = function(title,description,status,due_date){
    $.ajax({
        headers:{
            token:localStorage.token
        },
        method: 'POST',
        url:`${server}/todos`,
        contentType: "application/json; charset=utf-8",
        data:
        JSON.stringify({
            title:title,
            description:description,
            status:status,
            due_date:due_date

        })
         // this
    })
    .done(function(data){
        console.log('masuk')
        $('#addModal').modal('hide')
        showToDoList()
    })
    .fail(function(error) {
        // console.log('error ni')
        let msg = JSON.parse(error.responseText)
        Swal.fire({
            icon: "error",
          title: "Oops...",
          text: `${msg.message}`
        })
        console.log(error)
    })
    
}

$(this).click(function (e){
    if(document.activeElement.id == "deletetodo"){
        // console.log('masuk')
        e.preventDefault()
        deleteTodo(document.activeElement.href)
    }
    else if(document.activeElement.id == "updatetodo"){
        e.preventDefault()
        getModalUpdate(document.activeElement.href)
        
    }
})

function deleteTodo(url) {
    return $.ajax({
        method:'DELETE',
        url:url,
        headers:{
            token:localStorage.token
        },
        contentType: "application/json; charset=utf-8"
    })
    .done(function(data){
        console.log(data)
        showToDoList()
    })
    .fail()
}

$('#editForm').on('submit',function(e){
        
    var title = $('#titleEdit').val()
    var description = $('#descriptionEdit').val()
    var status = $('#statusEdit').val()
    var due_date = $('#due_dateEdit').val()
    e.preventDefault()
    $.ajax({
        method:'PUT',
        url:`${server}/todos/${localStorage.id}`,
        headers:{
            token:localStorage.token
        },
        contentType: "application/json; charset=utf-8",
        data:
        JSON.stringify({
            title:title,
            description:description,
            status:status,
            due_date:due_date

        })
    })
    .done(function(data){
        // console.log("masuk")
        localStorage.removeItem('id')
        $('#updateModal').modal('hide')
        showToDoList()
    })
    .fail(function(err){
        let msg = JSON.parse(error.responseText)
        Swal.fire({
            icon: "error",
          title: "Oops...",
          text: `${msg.message}`
        })
        console.log(error)
    })

})


function getModalUpdate(url){
$.ajax({
    headers:{token:localStorage.token},
    url:url
})
.done(function(data){
    localStorage.setItem('id',data.id)
    $('#titleEdit').val(data.title)
    $('#descriptionEdit').val(data.description)
    $('#statusEdit').val(data.status)
    $('#due_dateEdit').val(`${new Date(data.due_date).toISOString().substr(0,10)}`)
})
.fail(function (error) {
    console.log(error)
})
}
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:"POST",
        url:`http://localhost:3000/googleLogin`,
        data:{token:id_token}
    })
    .done(function (data) {
        // console.log(data)
        localStorage.setItem('token',data)
        // Login.hide()
        masuk.show()
        showToDoList()
        belumMasuk.hide()
    })
    .fail(function (err) {
        console.log(err)
    })
  }


    
    
    













    




