var $login = $('#login')
var $loginPage = $('#loginPage')
var $tableList = $('#tableList')
var $addTask = $('#addTask')
var $register = $('#register')
var $registerPage = $('#registerPage')
var $updateTask = $('#updateTask')
var $main_content = $('#main_content')
var $proceedUpdate = $('#proceedUpdate')
var $checkLogin = $('#checkLogin')
var $logout = $('#logout')

{/* <th scope="row" class="no"></th> */}

const url = 'http://localhost:3000'
const template = `
<tr>
    <td class="no"></td>
    <td class="title"></td>
    <td class='description'></td>
    <td class='due_date'></td>
    <td class='status'></td>
    <td class='action'></td>
</tr>
`
var deleteUrl = `<button onClick="deleteOnClick(`
var updateUrl = `<button onClick="getUpdateForm(`


$loginPage.on('click', function(e){
    e.preventDefault()
    $login.show()
    $register.hide()
})

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
        Swal.fire({
            icon: "success",
            text: `${response.title} has been saved`,
        })
    })
    .fail(({responseJSON}) => {
        Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: `Please fill in all fields`
        })
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
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
        console.log(result.value)
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
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
        $("#updateTitle").val(response.title)
        $("#updateDescription").val(response.description)
        $("#updateDue_date").val(new Date(response.due_date))

        // console.log(new Date(response.due_date))

        if(response.status == 'incomplete'){
            $(".updateIncomplete").attr('selected', 'selected');
            $(".updateComplete").attr('selected', '');
        } else {
            $(".updateComplete").attr('selected', 'selected');
            $(".updateIncomplete").attr('selected', '');
        }
        localStorage.setItem('id', id)
        display('updateTask')
        // generateData(response)
    })
    .fail(err => {
        console.log(err)
    })
}


function sortingDate(list){
    for (var i = 0; i < list.length; i++){
        for (var j = 0; j < list.length; j++){
            if(new Date(list[i].due_date) < new Date(list[j].due_date)){
                let temp = list[j]
                list[j] = list[i]
                list[i] = temp
            }
        }
    }
} 

function showAddForm(){
    console.log($addTask.attr('style'))
    if($addTask.attr('style') == 'display: none;'){
        $addTask.show()
    } else {
        $addTask.hide()
    }
}

// CALENDAR
// 105182697848-11aul2k1uk3vs78c8gj73icpgok0v7nk.apps.googleusercontent.com
// 3TFb4g7PN0Ys_Iz8tN0tgAyS 