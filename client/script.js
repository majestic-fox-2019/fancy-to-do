var $login = $('#login')
var $tableList = $('#tableList')
var $addTask = $('#addTask')
var $register = $('#register')
var $registerPage = $('#registerPage')
var $updateTask = $('#updateTask')
var $main_content = $('#main_content')
var $proceedUpdate = $('#proceedUpdate')
var $checkLogin = $('#checkLogin')
var $logout = $('#logout')


const url = 'http://localhost:3000'
const template = `
<tr>
    <th scope="row" class="no"></th>
    <td class="title"></td>
    <td class='description'></td>
    <td class='due_date'></td>
    <td class='status'></td>
    <td class='action'></td>
</tr>
`
var deleteUrl = `<button onClick="deleteOnClick(`
var updateUrl = `<button onClick="getUpdateForm(`

$logout.on('click', function(e){
    // console.log("bisa")
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    checkLogin()
})

$proceedUpdate.on('submit', function(e){
    e.preventDefault()
    var title = $("#updateTitle").val()
    var description = $("#updateDescription").val()
    var due_date = $("#updateDue_date").val()
    var status = $("#updateStatus").val().toLowerCase()

    console.log(title,description,due_date,status)
    $.ajax({
        method: 'PUT',
        url: `${url}/todos/${localStorage.id}`,
        data: {
            title: title,
            description: description,
            due_date: due_date,
            status: status
        },
        headers: {
            token: localStorage.token
        }
    })
    .done(response => {
        localStorage.removeItem("id")
        getData()
        display('main_content')
    })
    .fail(err => {
        console.log(err)
    })
})

$registerPage.on('click', function(e){
    e.preventDefault()
    $login.hide()
    $register.show()
})

$register.on('submit', function(e){
    e.preventDefault()
    var username = $register.find('#usernameRegister').val()
    var email = $register.find('#emailRegister').val()
    var password = $register.find('#passwordRegister').val()

    console.log(username, email, password)
    $.ajax({
        method: 'POST',
        url: `${url}/user/register`,
        data: {
            username: username,
            email: email,
            password: password
        }
    })
    .done(response => {
        Swal.fire({
            title: `User Registered!`,
            text: 'Good Job!',
            icon: 'success',
            confirmButtonText: `Proceed`
        })
    })
    .fail(err => {
        // console.log(err.responseJSON.errors.join('\n'))
        Swal.fire({
            title: 'Error!',
            text: err.responseJSON.errors.join('\n'),
            icon: 'error',
            confirmButtonText: 'Ok!'
        })
    })
})

$login.on('submit', function(e){
    e.preventDefault()
    var email = $login.find('#email').val()
    var password = $login.find('#password').val()
    console.log(email, password)
    $.ajax({
        method: 'POST',
        url: `${url}/user/login`,
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {
        var token = response.accessToken
        localStorage.setItem('token', token)
        getData(token)
        display('main_content')
    })
    .fail(err => {
        Swal.fire({
            title: 'Error!',
            text: err.responseJSON.errors,
            icon: 'error',
            confirmButtonText: 'Ok!'
        })
    })
})

$addTask.on('submit', function(e){
    e.preventDefault()
    var title = $addTask.find('#title').val()
    var description = $addTask.find('#description').val()
    var due_date = $addTask.find('#due_date').val()
    var status = $addTask.find('#status').val().toLowerCase()

    console.log(localStorage.token)

    $.ajax({
        method: 'POST',
        url: `${url}/todos`,
        headers: {
            token: localStorage.token
        },
        data: {
            title: title,
            description: description,
            due_date: due_date,
            status: status
        }
    })
    .done(response => {
        let token = localStorage.token
        getData(token)
    })
    .fail(err => {
        console.log(err.responseJSON)
    })
})

function checkLogin(){
    if(localStorage.token){
        getData()
        display('main_content')
    } else {
        display('login')
    }
}

function getData(token){
    $.ajax({
        method: 'GET',
        url: `${url}/todos`,
        headers: {
            token: localStorage.token
        }
    })
    .done(response => {
        generateData(response)
    })
}

function display(page){
    var pages = ['login', 'main_content', 'updateTask']
    for(var i = 0; i < pages.length; i++){
        if (pages[i] !== page){
            $(`#${pages[i]}`).hide()
        } else {
            $(`#${pages[i]}`).show()
        }
    }
}

function generateData(list){
    sortingDate(list)
    $tableList.empty()
    for (var i = 0; i < list.length; i++){
        var $item = $(template)
        $item.find('.no').text(i+1)
        $item.find('.title').text(list[i].title)
        $item.find('.description').text(list[i].description)
        $item.find('.due_date').text(list[i].due_date)
        $item.find('.status').text(list[i].status)
        $item.find('.action').append(`${deleteUrl}${list[i].id})" class="btn btn-danger">Delete` + "</button> ")
        $item.find('.action').append(`${updateUrl}${list[i].id})" class="btn btn-primary">Update` + "</button>")
        $tableList.append($item)
    }
    console.log(list)
}


function deleteOnClick(id){
    console.log(id)
    $.ajax({
        method: 'DELETE',
        url: `${url}/todos/${id}`,
        headers: {
            token: localStorage.token
        }
    })
    .done(response => {
        var token = localStorage.token
        getData(token)
    })
    .fail(err => {
        console.log(err)
    })
}

function getUpdateForm(id){
    console.log(localStorage)
    $.ajax({
        method: 'GET',
        url: `${url}/todos/${id}`,
        headers: {
            token: localStorage.token
        }
    })
    .done(response => {
        console.log(response)
        $("#updateTitle").val(response.title)
        $("#updateDescription").val(response.description)
        $("#updateDue_date").val(response.due_date)
        $("#updateStatus").val(response.status)
        localStorage.setItem('id', id)
        display('updateTask')
        // generateData(response)
    })
    .fail(err => {
        console.log(err)
    })
}

function sortingDate(list){
    console.log(list, "BEFORE")
    for (var i = 0; i < list.length; i++){
        for (var j = 0; j < list.length; j++){
            if(new Date(list[i].due_date) < new Date(list[j].due_date)){
                let temp = list[j]
                list[j] = list[i]
                list[i] = temp
            }
        }
    }
    console.log(list, "AFTER")
}