
$('#user').hide()
$('#register-page').hide();



  $('#show-register').click(function (e) {
    e.preventDefault()
    $('#register-page').show();
    $('#login-page').hide();
  })
  
  $('#show-sign').click(function (e) { 
    e.preventDefault()
    $('#register-page').hide();
    $('#login-page').fadeIn();
  });


$('#log-out').click(function(e) {
  localStorage.removeItem('token')
  $('#login-page').show();
  $('#user').hide()
})



$('#register-form').on('submit', function (e) {
  e.preventDefault()
	$.ajax({
		url : "http://localhost:3000/register",
		type: "POST",
		data : {
      name: $('#name').val(),
      email : $('#email').val(),
      password : $('#password').val()
    }
  }).done(function(response){ //
    $('#login-page').show();
    $('#register-page').hide();
	  $("#server-results").html(response);
	});
});


$('#login-form').on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    url : "http://localhost:3000/login",
		type: "POST",
		data : {
      email : $('#email-login').val(),
      password : $('#password-login').val()
    }
  }).done(function(response){ //
    localStorage.setItem("token",response.token)
    //$('#login-page').hide();
    //$('#user').show()
   location.reload()
	});
});

$('#add-todo').on('submit', function (e) {
  e.preventDefault()
	$.ajax({
    headers : {token : localStorage.getItem('token')},
		url : "http://localhost:3000/todos",
		type: "POST",
		data : {
      title : $('#title').val(),
      description : $('#description').val(),
      due_date : $('#due-date').val()
    }
  }).done(function(response){ //
    showList()
    location.reload()
	});
});

if(localStorage.getItem('token')){
  $('#login-page').hide();
  $('#register-page').hide();
  showList()
  $('#user').show()
}else{
  $('#login-page').show();
}

function showList() {

  $.ajax({
    url: "http://localhost:3000/todos",
    headers : {token : localStorage.getItem('token')},
    type: 'GET',
    success: function(res) {
      if(res){

        let html=""
        
        res.forEach(data => {
          let date = new Date(data.createdAt).toDateString()
          let due_date = new Date(data.due_date).toDateString()
          html+= `<tr>
          <th scope="row">${data.id}</th>
          <td>${data.title}</td>
          <td>${data.description}</td>
          <td>${data.status}</td>
          <td>${date}</td>
          <td>${due_date}</td>
          <td>
          <button onclick="deleteTodo(${data.id})" type="button" class="btn btn-danger bt-sm">Delete</button>
          <button type="button" class="btn btn-primary bt-sm">Update</button>

          </td>
          </tr> `
        });
        $( "#table-user" ).append(html);  
        
      }
      $('#user').show();
    } 
  });
}

function deleteTodo(id) {
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    headers :  {token : localStorage.getItem('token')},
    type : 'DELETE',
    success : function (result) {
      location.reload()
      showList()
    }
  })
}

