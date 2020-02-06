var $login = $('#login')
var $loginPage = $('#loginPage')
var $tableList = $('#tableList')
var $todoCard = $('#todoCard')
var $addTask = $('#addTask')
var $register = $('#register')
var $registerPage = $('#registerPage')
var $updateTask = $('#updateTask')
var $main_content = $('#main_content')
var $proceedUpdate = $('#proceedUpdate')
var $checkLogin = $('#checkLogin')
var $logout = $('#logout')

var CLIENT_ID = '105182697848-11aul2k1uk3vs78c8gj73icpgok0v7nk.apps.googleusercontent.com'
var API_KEY = 'AIzaSyCfLb30dhm_sY-WHHHFv4NopdboehepFKQ'
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('authorize_button');


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

function getUpdateForm(id){
    // console.log(id)
    
    $.ajax({
        method: 'PATCH',
        url: `${url}/todos/${id}`,
        headers: {
            token: localStorage.token
        },
        data: {
            id
        }
    })
    .done(response => {
        console.log(response)
        getData()
    })
    .fail(err => {
        console.log(err)
    })
}


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

// $proceedUpdate.on('submit', function(e){
//     e.preventDefault()
//     var title = $("#updateTitle").val()
//     var description = $("#updateDescription").val()
//     var due_date = $("#updateDue_date").val()
//     var status = $("#updateStatus").val().toLowerCase()

//     console.log(title,description,due_date,status)
//     $.ajax({
//         method: 'PUT',
//         url: `${url}/todos/${localStorage.id}`,
//         data: {
//             title: title,
//             description: description,
//             due_date: due_date,
//             status: status
//         },
//         headers: {
//             token: localStorage.token
//         }
//     })
//     .done(response => {
//         localStorage.removeItem("id")
//         getData()
//         display('main_content')
//     })
//     .fail(err => {
//         console.log(err)
//     })
// })




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
        url: `${url}/users/register`,
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
        console.log(err)
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
        url: `${url}/users/login`,
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {
        ($('#body')).css('background-image', 'none')
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
        var token = localStorage.token

        var text = ''
        //CALENDAR HERE
        if(gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)){
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
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                {'method': 'email', 'minutes': 24 * 60},
                            ],
                        },
                };

                gapi.client.calendar.events.insert({
                    calendarId: 'primary',
                    resource: event,
                })
                .then(results =>{
                    Swal.fire({
                        icon: "success",
                        text: `${title} added to your Google Calendar`,
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        text += `${title} added to Todo list`
        console.log(text)

        getData(token)
        Swal.fire({
            icon: "success",
            text: text,
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
        ($('#body')).css('background-image', 'none')
        getData()
        display('main_content')
    } else {
        ($('#body')).css('background-image', 'linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33))')
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
        //DISINI EDIT


        // generateData(response)
        generateCard(response)
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


// TEMPLATE CARD
var templateCard = `
        <div class="card bg-light mb-3" style="min-width: 300px; max-width: 18rem;">
            <div class="text-center">
                <div class="card-header title">Header</div>
                <div class="card-body">
                <p class="card-text description"></p>
                <p class="card-text due_date"></p>
                <p class="card-text status"></p>
                <p class="card-text action"></p>
                </div>
            </div>
        </div>
`

function generateCard(list){
    $todoCard.empty()
    for (var i = 0; i < list.length; i++){
        var $item = $(templateCard)
        $item.find('.no').text(i+1)
        $item.find('.title').text(list[i].title)
        $item.find('.description').text(list[i].description)
        $item.find('.due_date').text(list[i].due_date + ` (${getExpired(list[i].due_date)})`)
        $item.find('.status').text(list[i].status)
        $item.find('.action').append(`${deleteUrl}${list[i].id})" class="btn btn-danger">Delete` + "</button> ")
        $item.find('.action').append(`${updateUrl}${list[i].id})" class="btn btn-primary">Update` + "</button>")
        $todoCard.append($item)
    }
}

// function generateData(list){
//     $tableList.empty()
//     for (var i = 0; i < list.length; i++){
//         var $item = $(template)
//         $item.find('.no').text(i+1)
//         $item.find('.title').text(list[i].title)
//         $item.find('.description').text(list[i].description)
//         $item.find('.due_date').text(list[i].due_date + ` (${getExpired(list[i].due_date)})`)
//         $item.find('.status').text(list[i].status)
//         $item.find('.action').append(`${deleteUrl}${list[i].id})" class="btn btn-danger">Delete` + "</button> ")
//         $item.find('.action').append(`${updateUrl}${list[i].id})" class="btn btn-primary">Update` + "</button>")
//         $tableList.append($item)
//     }
// }

function getExpired(date){
    var deadline = (new Date(date)).getTime()
    var today = (new Date()).getTime()
    var diff = (deadline - today)
    var numOfDays = new Date(deadline - today).getDay()
    if(diff < 0){
        return 'This task already past deadline'
    } else if (numOfDays == 0){
        return `Expired in ${numOfDays} day`
    } else {
        return `Expired in ${numOfDays} days`
    }
    // return dt
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
        console.log(result)
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

// function getUpdateForm(id){
//     console.log(localStorage)
//     $.ajax({
//         method: 'GET',
//         url: `${url}/todos/${id}`,
//         headers: {
//             token: localStorage.token
//         }
//     })
//     .done(response => {
//         $("#updateTitle").val(response.title)
//         $("#updateDescription").val(response.description)
//         $("#updateDue_date").val(new Date(response.due_date))

//         // console.log(new Date(response.due_date))

//         if(response.status == 'incomplete'){
//             $(".updateIncomplete").attr('selected', 'selected');
//             $(".updateComplete").attr('selected', '');
//         } else {
//             $(".updateComplete").attr('selected', 'selected');
//             $(".updateIncomplete").attr('selected', '');
//         }
//         localStorage.setItem('id', id)
//         display('updateTask')
//         // generateData(response)
//     })
//     .fail(err => {
//         console.log(err)
//     })
// }

function showAddForm(){
    console.log($addTask.attr('style'))
    if($addTask.attr('style') == 'display: none;'){
        $addTask.show()
    } else {
        $addTask.hide()
    }
}



function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}


function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    })
    .then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
    }, 
    function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
    } else {
        authorizeButton.style.display = 'block';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}
