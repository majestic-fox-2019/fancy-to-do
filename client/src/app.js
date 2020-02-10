$('.error').hide()
$("#registerForm").hide()
$('.container-home').hide()
var $todos = []
var idUpdate = 0
var $err = ""

checkLogin()

$('#loginForm').on('submit', function (event) {
    event.preventDefault()
    var email = $(".email").val()
    var password = $(".password").val()
    console.log('wooe')
    console.log(email, password)
    loginUser(email, password)
})

$('#registerForm').on('submit', function (event) {
    event.preventDefault()
    var nameRegister = $(".name").val()
    var emailRegister = $(".emailRegister").val()
    var passwordRegister = $(".passwordRegister").val()
    registerUser(nameRegister, emailRegister, passwordRegister)
   
})

$('.register-click').on('click', function(event) {
    $('#loginForm').hide()
    $("#registerForm").show()
})

$('.create-show').on('click', function(event){
    $('.create-todo').show()  
})

$('.create').on('submit', function(event){
    event.preventDefault()
    var title= $('.create-title').val()
    var description = $('.create-description').val()
    var due_date= $('.create-date').val()

    createTodo(title, description, due_date)
})

$('.create-todo').on('click', function(event) {
    if(event.target.className == 'create-todo') {
        $('.create-todo').hide()
        $('.list-todo').show()
    }
})

$('.update-btn').on('click', function(event) {
    event.preventDefault()
     
    var tittle = $(".update-title").val()
    var description = $(".update-description").val()
    var status = $(".update-status").val()
    var date = $(".update-date").val()
    console.log("masuk update")
    // console.log(idUpdate ,tittle, description, status, date)
    updateTodo(tittle, description, status, date)
    
})

function reloadData(){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todo/',
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        }
    })
    .done(response => {
        $todos = response
        console.log(response)
        if(response.length === 0) {
            var noTodo = `
            <div class="header-no-todo">
            <h1 class="header-no-todo-title"> No One Todo List </h1>
            </div>
            `
            $(".list-todo").append(noTodo)
        } else {
            $('.list-todo').empty()
            for(let i = 0; i < response.length; i++){
                var todoList = `
                <div class="card-todo-user">
                    <div class="card-todo">
                        <h3>${response[i].tittle}</h3>
                        <span>${response[i].description}</span>
                        <p style="font-size: 8px; margin-top: 10px;">${response[i].due_date}</p>
                    </div>
                    <div class="btn-todo">
                        <span>${response[i].status}</span>
                        <button class="delete-todo" onClick="deleteTodo(${response[i].id})">delete</button>
                        <button class="edit-todo" onClick="showUpdateForm(${response[i].id})">edit</button>
                    </div>
                </div>
                `
                $('.list-todo').append(todoList)
            }
        }
    })
    .fail(err => {
        console.log(err)
    })
}


function checkLogin(){
    if(localStorage.getItem("token")){
        $('.container-login').hide()
        $('.container-home').show()  
        reloadData() 
    } else {
        $('.container-login').show()
        $(".container-home").hide()
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear()
        checkLogin()
        console.log('User signed out.');

    });
  }


function registerUser(name, email, password){
    console.log(name)
    console.log(email)
    console.log(password)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/register',
        data: {
            name,
            email,
            password 
        }
    })
    .done(response => {
        console.log(response)
        $('#loginRegister').hide()
    })
    .fail(err => {
        console.log(err)
        $('.error').text(err.responseJSON.errors).show()
        setTimeout(() => {
            $('.error').hide() 
        }, 1000);
    })
}
function loginUser(email, password) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
            email,
            password 
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem('token', response.token)
        checkLogin()
        reloadData()
    })
    .fail(err => {
        console.log(err)
        $('.error').text(err.responseJSON.errors).show()
        setTimeout(() => {
            $('.error').hide() 
        }, 1000);
    })
}
  
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/googleSignIn",
        cache: false,
        data: {
            googleToken: id_token
        }
    })
    .done(response => {
        console.log('berhasil login dengan google')
        console.log(response)
        localStorage.setItem('token', response.token)
        checkLogin()
        reloadData()
    })
    .fail(err => {
        console.log(err)
    })
}

function createTodo(title, description, due_date){
    $.ajax({
        url: 'http://localhost:3000/todo/',
        method: 'POST',
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        data: {
            title,
            description,
            due_date
        }
    })
    .done(response => {
        console.log(response)
        $('.create-todo').hide()
        reloadData()
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteTodo(id){
    // console.log(id)
    $.ajax({
        url: `http://localhost:3000/todo/${id}`,
        method: 'DELETE',
    })
    .done(response => {
        console.log(response)
        // checkLogin()
        reloadData()
    })
    .fail(err => {
        console.log(err)
    })
}

function showUpdateForm(id) {
    $.ajax({
        url: `http://localhost:3000/todo/${id}`,
        method: "GET",
        headers:{
            "Authorization": localStorage.getItem("token")
        }
    })
    .done(response => {
        var date = response.due_date.toSting()
        console.log(response)
        $(".update-title").val(response.tittle)
        $(".update-description").val(response.description)
        $(".update-status").val(response.status)
        $(".update-date").val(response.due_date)
        idUpdate = response.id
        $('.update-todo').show()
    })
}

function updateTodo(tittle, description, status, due_date) {
    // console.log(tittle, description, status, date)
    $.ajax({
        url: `http://localhost:3000/todo/${idUpdate}`,
        method: 'PUT',
        headers: {
            "Authorization": localStorage.getItem("token")
        },
        data: {
            tittle,
            description,
            status,
            due_date
        }
    })
    .done(response => {
        console.log(response)
        $('.update-todo').hide()
        reloadData()
    })
    .fail(err => {
        $('.update-todo').hide()
        console.log(err)
    })
}