// import { register } from "../server/controllers/user"

var baseUrl = 'http://localhost:3000'

var emailLogin = $('#emailLogin')
var passwordLogin = $('#passwordLogin')

var emailRegister = $('#emailRegister')
var passwordRegister = $('#passwordRegister')

var titleAdd = $('#titleAdd')
var desctiptionAdd = $('#desctiptionAdd')
var statusAdd = $('#statusAdd')
var due_dateAdd = $('#due_dateAdd')


// Login Page Function
$(function() {

  $(".input input").focus(function() {

     $(this).parent(".input").each(function() {
        $("label", this).css({
           "line-height": "18px",
           "font-size": "18px",
           "font-weight": "100",
           "top": "0px"
        })
        $(".spin", this).css({
           "width": "100%"
        })
     });
  }).blur(function() {
     $(".spin").css({
        "width": "0px"
     })
     if ($(this).val() == "") {
        $(this).parent(".input").each(function() {
           $("label", this).css({
              "line-height": "60px",
              "font-size": "24px",
              "font-weight": "300",
              "top": "10px"
           })
        });

     }
  });

  $(".button").click(function(e) {
     var pX = e.pageX,
        pY = e.pageY,
        oX = parseInt($(this).offset().left),
        oY = parseInt($(this).offset().top);

     $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
     $('.x-' + oX + '.y-' + oY + '').animate({
        "width": "500px",
        "height": "500px",
        "top": "-250px",
        "left": "-250px",

     }, 600);
     $("button", this).addClass('active');
  })

  $(".alt-2").click(function() {
     if (!$(this).hasClass('material-button')) {
        $(".shape").css({
           "width": "100%",
           "height": "100%",
           "transform": "rotate(0deg)"
        })

        setTimeout(function() {
           $(".overbox").css({
              "overflow": "initial"
           })
        }, 600)

        $(this).animate({
           "width": "140px",
           "height": "140px"
        }, 500, function() {
           $(".box").removeClass("back");

           $(this).removeClass('active')
        });

        $(".overbox .title").fadeOut(300);
        $(".overbox .input").fadeOut(300);
        $(".overbox .button").fadeOut(300);

        $(".alt-2").addClass('material-buton');
     }

  })

  $(".material-button").click(function() {

     if ($(this).hasClass('material-button')) {
        setTimeout(function() {
           $(".overbox").css({
              "overflow": "hidden"
           })
           $(".box").addClass("back");
        }, 200)
        $(this).addClass('active').animate({
           "width": "700px",
           "height": "700px"
        });

        setTimeout(function() {
           $(".shape").css({
              "width": "50%",
              "height": "50%",
              "transform": "rotate(45deg)"
           })

           $(".overbox .title").fadeIn(300);
           $(".overbox .input").fadeIn(300);
           $(".overbox .button").fadeIn(300);
        }, 700)

        $(this).removeClass('material-button');

     }

     if ($(".alt-2").hasClass('material-buton')) {
        $(".alt-2").removeClass('material-buton');
        $(".alt-2").addClass('material-button');
     }

  });

});


$(window).on("load", function() {

  let token = localStorage.getItem("token")
  if(token) {
    $("#loginPage").hide()
    $("#todoPaage").show()
    getDataSolat()
    showAll()
  } else {
    $("#loginPage").show()
    $("#todoPaage").hide()
  }
})

  $("#login").click(function(e){
    e.preventDefault()
    login()
  })

  $("#register").click(function(e){
    e.preventDefault()
    register()
  })

  $("#addTodo").submit(function(e){
    e.preventDefault()
    addTodo()
  })

  $("#deleteTodo").click(function(e){
    e.preventDefault()
    deleteTodo(id)
  })

function getDataSolat() {
  $.ajax(`${baseUrl}/solat`, {
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    },
    success: function(res) {
      console.log(res)
      let dataWeather =       
      `
      <i class="fas fa-calendar-week"></i>  ${res.items[0].date_for}<br>
      Pressure : ${res.today_weather.pressure}
      <p > <i class="fas fa-temperature-low"></i>  ${res.today_weather.temperature}</p>
      `
      let dataSolat = `
      Fajr: ${res.items[0].fajr} <br>
      Shurooq: ${res.items[0].shurooq}   Duhr: ${res.items[0].dhuhr}<br>
      Asr: ${res.items[0].asr}   Magrib: ${res.items[0].maghrib}<br>
      Isha: ${res.items[0].isha} <br>
      `
      $("#getWeather").append(dataWeather)
      $("#getSolat").append(dataSolat)
    },
    error: function(err){
      console.log(err)
    }
  })
}

  
function login () {
  $.ajax(`${baseUrl}/login`, {
    method: "POST",
    data: {
      email:emailLogin.val(),
      password:passwordLogin.val()
    },
    success: function(response){
      let token = response.token
      localStorage.setItem("token", token)
      $("#loginPage").hide()
      showAll()
      $("#todoPaage").show()
      Swal.fire({
        icon: 'success',
        title: 'Successfully login!',
        showConfirmButton: false,
        timer: 1500
      })
    },
    error: function(err){
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...', 
        text: err.responseJSON.msg
      })
    }
  })
}

function onSignIn(googleUser) {
  
  var id_token = googleUser.getAuthResponse().id_token;
$.ajax(`${baseUrl}/login/google-sign-in`,{
  method:"POST",
  data:{
    id_token
  },
  success: function(response){
    console.log(response)
    let token = response.token
    localStorage.setItem("token", token)
    $("#loginPage").hide()
    showAll()
    $("#todoPaage").show()
    Swal.fire({
      icon: 'success',
      title: 'Successfully login from your Google account!',
      showConfirmButton: false,
      timer: 1500
    })
  },
  error: function(err){
    console.log(err)
  }
})
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  Swal.fire({
    title: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.value) {
      localStorage.clear()
      $("#todoPaage").hide()
      $("#loginPage").show()
      Swal.fire(
        'Logged out!'
      )
    }
  })
 
}

function register(){
  $.ajax(`${baseUrl}/register`, {
    method: "POST",
    data: {
      email:emailRegister.val(),
      password:passwordRegister.val()
    },
    success: function(response){
      console.log("berhasil", response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'successfully registered! sign in to start your ToDo!',
        showConfirmButton: false,
        timer: 3000
      })
    },
    error: function(err){
      console.log(err)
      let errors = '<div class="flex-column" style="color:red">'
      err.responseJSON.errMsg.forEach(salah => {
        errors += `<div class="col"> ${salah} </div>`
      })
      errors += "</div>"
      Swal.fire({
        icon: 'error',
        title: 'Oops...', 
        html: errors
      })
    }
  })
}

function addTodo(){
 
  $.ajax(`${baseUrl}/todos/`, {
    method: "POST",
    data:{
      title: titleAdd.val(),
      desctiption: desctiptionAdd.val(),
      status: statusAdd.val(),
      due_date: due_dateAdd.val()
    },
    headers: {
      token:localStorage.getItem("token")
    },
    success: function(response) {
      showAll()
      $("#addTodo").modal("hide")
    },
    error: function(err){
      console.log(err)
      let errors = '<div class="flex-column" style="color:red">'
      err.responseJSON.errMsg.forEach(salah => {
        errors += `<div class="col"> ${salah} </div>`
      })
      errors += "</div>"
      Swal.fire({
        icon: 'error',
        title: 'Oops...', 
        html: errors
      })
    }
  })
}


function todocards(todo) {
  let cardName
  if(todo.status == "Done"){
    cardName = "bg-success mb-3"
  } else if(todo.status == "On progress") {
    cardName = "bg-warning mb-3"
  } else {
    cardName = "bg-info mb-3"
  }
  const content = `
  <div class="col-md-3">
    <div class="card text-white ${cardName}" style="max-width: 18rem;">
      <div class="card-header">todo number ${todo.id}</div>
      <div class="card-body">
        <h5 class="card-title">${todo.title}</h5>
        <p class="card-text">status:</p>
        <h4 class="card-title">${todo.status}</h4>
        <p class="card-text">due date on:</p>
        <h5 class="card-title">${new Date(todo.due_date).toISOString().substr(0,10)}</h5>
        <p class="card-text">${todo.desctiption}</p>
        <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-outline-light btn-sm mr-2" onclick="deleteTodo(${todo.id})">DELETE</button> 
        <button type="button" class="btn btn-outline-dark btn-sm" onclick="showEdit('${todo.id}', '${todo.title}', '${todo.desctiption}', '${todo.status}', '${todo.due_date}')">EDIT</button>
      </div>
      </div>
    </div>
  </div>
  `
return content
}

function showAll() {
  $("#todoList").empty()
  $.ajax({
    type: 'GET',
    url: `${baseUrl}/todos/`,
    headers: {
      token: localStorage.getItem('token')
    },
    success: function (todos) {
      todos.forEach(todo => {
        $('#todoList').append(todocards(todo))
      });
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function deleteTodo(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
    
      $.ajax(`${baseUrl}/todos/${id}`, {
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token")
        },
        success: function(){
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          showAll()
        },
        error: function(err){
          console.log(err)
        }
      })
    }
  })
}

function editTodo(id) {
  $.ajax(`${baseUrl}/todos/${id}`, {
    method:"PUT",
    data:{
      title: $('#titleEdit').val(),
      desctiption: $('#desctiptionEdit').val(),
      status: $('#statusEdit').val(),
      due_date: $('#due_dateEdit').val()
    },
    headers: {
      token: localStorage.getItem("token")
    },
    success: function(response){
      $("#editTodo").modal("hide")
      showAll()
    },
    error: function(err){
      console.log(err)
      let errors = '<div class="flex-column" style="color:red">'
      err.responseJSON.errMsg.forEach(salah => {
        errors += `<div class="col"> ${salah} </div>`
      })
      errors += "</div>"
      Swal.fire({
        icon: 'error',
        title: 'Oops...', 
        html: errors
      })
    }
  })
}

function showEdit(id, title, desctiption, status, due_date) {
  console.log(id, title, desctiption, status, due_date)
  const modal = editModal({id, title, desctiption, status, due_date})
  $('#editTodo').append(modal)
  $("#editTodo").modal("show")
}

function editModal(todo) {
    const component = `
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="EditTodoLabel">Edit ToDo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input type="text" class="form-control" id="titleEdit" value="${todo.title}" >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <input type="text" class="form-control" id="desctiptionEdit" value="${todo.desctiption}">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Status</label>
            <select class="form-control" id="statusEdit">
              <option value="Done">Done</option>
              <option value="On progress">On progress</option>
              <option value="Not started yet">Not started yet</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Due Date</label>
            <input type="date" class="form-control" id="due_dateEdit" 
            value="${new Date(todo.due_date).toISOString().substr(0,10)}"
            >
          </div>   
          <button type="submit" class="btn btn-primary" onClick="editTodo(${todo.id})">Edit</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
    `
    return component
}

function filterTodo(status) {
  $.ajax(`${baseUrl}/todos/filter/${status}`,{
    method: "GET",
    headers: {
      token: localStorage.getItem("token")
    },
    success: function (todos) {
      $("#todoList").empty()
      todos.forEach(todo => {
        $("#todoList").append(todocards(todo))
      })
      console.log(todos, "berhasil")
    },
    error: function (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.responseJSON.msg
      })
    }
  })
}


