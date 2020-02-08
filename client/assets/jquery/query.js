// PARAM CONSTANTA
var baseURL = "http://localhost:3000"
var token = localStorage.getItem('token')
// console.log(localStorage.getItem('token'))
// localStorage.removeItem('token')

$('#form-login').hide();
$('#form-register').hide();
$('#showTodo').hide();
$('#showEdit').hide();
// $('#form-add').hide()

// SHOW REGISTER
$('#showRegister').on('click', function (event) {
    event.preventDefault()
    $('#form-register').show();
    $('#form-login').hide();
});
// SHOW LOGIN
$('#showLogin').on('click', function (event) {
    event.preventDefault()
    $('#form-login').show();
    $('#form-register').hide();
});
// SHOW ADD
$('#buttonAdd').on('click', function (event) {
    event.preventDefault()
    $('#showAdd').show();
    $('#showTodo').hide();
});
// SHOW EDIT
$(document).on('click', 'a', function(event){
    event.preventDefault()
    var dataURL = $(this).data('url')
    $.ajax({
        type: "GET",
        headers: {token : token},
        url: dataURL,
        success: function (response) {
            $("#title-edit").val(response.title)
            $("#description-edit").val(response.description)
            $("#id-edit").val(response.id)
        }
    });
})


// EDIT PROSES
$('#form-edit').on('submit', function (event) {
    event.preventDefault()
    var title = $('#title-edit').val();
    var description = $('#description-edit').val();
    var id = $("#id-edit").val()
    $.ajax({
        type: "put",
        headers: {token: token},
        url: `${baseURL}/todos/${id}`,
        data:{
            title: title,
            description: description
        },
        success: (res) =>{
            console.log(res)
        }
    })
});
// SHOW DELETE
$(document).on('click', 'a', function(event){
    event.preventDefault()
    var dataURL = $(this).data('url')
    console.log(dataURL)
    $.ajax({
        type: "GET",
        headers: {token : token},
        url: dataURL,
        success: function (response) {
            $("#id-delete").val(response.id)
        }
    });
})
// Delete
$('#form-delete').on('submit', function(event){
    // event.preventDefault()
    var id = $("#id-delete").val()
    console.log(id)
    $.ajax({
        type: "DELETE",
        headers: {token : token},
        url: `${baseURL}/todos/${id}`,
        success: function (response) {
            console.log(response, 'Success delete')
        }
    });
})
$("#submit-delete").on('click', function(event){
    $("#deleteModal").hide()
})

// LOGOUT
$("#logout").on('click', function(event){
    localStorage.removeItem('token')
})

// LOGIN
$('#form-login').on('submit', function (event) {
    event.preventDefault()
    var email = $('#email').val();
    var password = $('#password').val();
    $.ajax({
        type: "POST",
        url: baseURL+"/login",
        data: {
            email:email,
            password:password
        }
    }).done(data =>{
        localStorage.setItem('token', data.token)
        $('#showTodo').show();
        $('#form-login').hide();
        console.log(data.token)
    }).fail(err =>{
        console.log(err)
    })
});
// REGISTER
$('#form-register').on('submit', function (event) {
    event.preventDefault()
    var email = $('#email-reg').val();
    var password = $('#password-reg').val();
    $.ajax({
        type: "POST",
        url: baseURL+"/register",
        data: {
            email:email,
            password:password
        }
    }).done(data =>{
        // localStorage.setItem('token', data.token)
        console.log(data)
    }).fail(err =>{
        console.log(err)
    })
  });
console.log(token)

// CREATE TODO
$('#form-add').on('submit', function (event) {
    event.preventDefault()
    var title = $('#title').val();
    var description = $('#description').val();
    var due_date = $('#due_date').val();
    $.ajax({
        type: "POST",
        url: baseURL+"/todos",
        headers: {token: token},
        data: {
            title:title,
            description:description,
            due_date:due_date,
        }
    }).done(data =>{
        // localStorage.setItem('token', data.token)
        console.log(data, 'Data BErhasil Di tambah')
    }).fail(err =>{
        console.log(err)
    })
  });

// SHOW ALL TODO
if (token) {
    console.log('MASUK PAK EKO')
    console.log(token)
    $('#showTodo').show()
    $('#showAdd').hide()
    $('#showForm').hide()
    $.ajax({
        type: "GET",
        url: baseURL+"/todos",
        headers: {token: token},
        success: (res) =>{
            res.forEach((element, index) => {
                $("#dataTodo").append(
                    `
                    <tr>
                    <th scope="row">${index+1}</th>
                    <td>${element.title}</td>
                    <td>${element.description}</td>
                    <td>${element.status}</td>
                    <td>${element.due_date}</td>
                    <td>${element.createdAt}</td>
                    <td>
                    <a class="btn btn-info" id="edit" data-toggle="modal" data-target="#editModal" data-url="${baseURL}/todos/${element.id}" >edit</a>
                    <a class="btn btn-danger" id="delete" data-toggle="modal" data-target="#deleteModal" data-url="${baseURL}/todos/${element.id}">delete</a>
                    </td>
                    </tr> `
                    );
                });
                }
    })
}else{
    $('#form-login').show();
    $('#showLogout').hide();
    $('#form-add').hide()

}

//Login Google
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const email = profile.getEmail();
    console.log(googleUser)
    $.ajax({
        method: "POST",
        url: `${baseURL}/signInGoogle`,
        data: {
            email: email
        }
    })
        .done(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);
            console.log(localStorage.email)
            getData(data.token);
        })
        .fail(err => {
            // $error.fadeIn("fast");
            // getError(err.response);
            console.log(err)
        });
}
// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     var email = profile.getEmail();

//     console.log(profile)
    
//   }
//LOGOUT GOOGLE
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    auth2.disconnect();
}