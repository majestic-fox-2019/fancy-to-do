var todo = (function () {
  var $logReg = $("#carousel");
  var $login = $("#login");
  var $register = $("#register");
  var $app = $("#app");
  var $todoList = $("#todo-list");
  var $addTodoForm = $("form#addTodo");

  var base_uri = "http://localhost:3000";
  var todoTemplate =
  `<div class="col-12 col-md-6 col-lg-3 mb-3">
    <div class="card">
      <div class="card-header">
        <h4 class="title"></h4>
      </div>
      <div class="card-body">
        <p class="lead description"></p>
        <p class="due-date"></p>
      </div>
      <div class="card-footer">
        <button class="todo-mark btn"></button>
        <button class="todo-del btn btn-danger">Delete</button>
      </div>
    </div>
  </div>`

  $app.hide();
  $logReg.hide();

  function appendTodo(todos) {
    $todoList.text("");
    for (const todo of todos) {
      var todoTime = new Date(todo.due_date);
      var timeStamp = `${todoTime.getFullYear()} - ${todoTime.getMonth() + 1} - ${todoTime.getDate()}`;
      var toAppend = $(todoTemplate);
      toAppend.find(".title").text(todo.title);
      toAppend.find(".description").text(todo.description);
      toAppend.find(".due-date").text(timeStamp);
      toAppend.find(".todo-del").attr("value", todo.id);
      // check mark and expire
      var due = new Date(todo.due_date);
      var now = Date.now();
      if (due.getTime() < now) {
        toAppend.find(".card").addClass("border-danger");
        toAppend.find(".todo-mark").addClass("btn-secondary");
        toAppend.find(".todo-mark").text("Expire");
        toAppend.find(".todo-mark").attr("disabled", true);
      }
      else if (todo.status === "done") {
        toAppend.find(".card").addClass("border-success");
        toAppend.find(".todo-mark").addClass("todo-undone btn-info");
        toAppend.find(".todo-mark").text("Undone");
        toAppend.find(".todo-undone").attr("value", todo.id);
      }
      else {
        toAppend.find(".card").addClass("border-warning");
        toAppend.find(".todo-mark").addClass("todo-done btn-primary");
        toAppend.find(".todo-mark").text("Done");
        toAppend.find(".todo-done").attr("value", todo.id);
      }
      // marking button
      $todoList.append(toAppend);
    }
  }

  function fetchTodo() {
    $.ajax({
      url: `${base_uri}/todos`,
      type: "GET",
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(function (result) {
        appendTodo(result);
      })
      .fail(function (err) {
        console.error(err);
        localStorage.clear();
      });
  }

  function isLogin() {
    if (localStorage.getItem("access_token")) {
      $logReg.hide();
      $app.show();
      fetchTodo();
    }
    else {
      $logReg.show();
      $app.hide();
    }
  }
  isLogin();

  // todo add
  $addTodoForm.on("submit", function (e) {
    e.preventDefault();
    var title = $addTodoForm.find("#addTodoTitle").val()
    var description = $addTodoForm.find("#addTodoDescription").val()
    var due_date = $addTodoForm.find("#addTodoDueDate").val()
    $("#addTodoModal").modal("hide");
    $.ajax({
      url: `${base_uri}/todos`,
      type: "POST",
      headers: {
        access_token: localStorage.getItem("access_token")
      },
      data: {
        title,
        description,
        due_date
      }
    })
      .done(function () {
        fetchTodo();
      })
      .fail(function (err) {
        console.error(err);
      });
  })

  // todo done
  $(document).on("click", ".todo-done", function (e) {
    const val = e.target.value;
    $.ajax({
      url: `${base_uri}/todos/${val}/done`,
      type: "PATCH",
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(function () {
        fetchTodo();
      })
      .fail(function (err) {
        console.error(err);
      });
  });
  
  // todo undone
    $(document).on("click", ".todo-undone", function (e) {
      const val = e.target.value;
      $.ajax({
        url: `${base_uri}/todos/${val}/undone`,
        type: "PATCH",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .done(function () {
          fetchTodo();
        })
        .fail(function (err) {
          console.error(err);
        });
    });

  // todo delete
  $(document).on("click", ".todo-del", function (e) {
    const val = e.target.value;
    $.ajax({
      url: `${base_uri}/todos/${val}`,
      type: "DELETE",
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(function () {
        fetchTodo();
      })
      .fail(function (err) {
        console.error(err);
      });
  })

  // google sign-in
  function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      url: `${base_uri}/users/g-signin`,
      type: "POST",
      data: {
        id_token
      }
    })
      .done(function (result) {
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            var value = result[key];
            localStorage.setItem(key, value);
          }
        }
        isLogin();
        fetchTodo();
      })
      .fail(function (err) {
        console.error(err);
      })
  }
  // google sign-out
  function signOut() {
    localStorage.clear();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    auth2.disconnect();
    isLogin();
  }

  // login
  $login.on("submit", function (e) {
    e.preventDefault();
    var email = $login.find("#loginEmail").val();
    var password = $login.find("#loginPassword").val();
    login(email, password);
  });

  // register
  $register.on("submit", function (e) {
    e.preventDefault();
    var name = $register.find("#registerName").val();
    var email = $register.find("#registerEmail").val();
    var password = $register.find("#registerPassword").val();
    console.log(`${name} - ${email} - ${password}`);
    $.ajax({
      url: `${base_uri}/users/register`,
      type: "POST",
      data: {
        name, email, password
      }
    })
      .done(function (result) {
        login(result.email, password);
      })
      .fail(function (err) {
        console.error(err);
      });
  });

  // login ajax
  function login(email, password) {
    $.ajax({
      url: `${base_uri}/users/login`,
      type: "POST",
      data: {
        email, password
      }
    })
      .done(function (result) {
        localStorage.clear();
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            var value = result[key];
            localStorage.setItem(key, value);
          }
        }
        isLogin();
      })
      .fail(function (err) {
        console.error(err);
      });
  }

  return {
    onSignIn: onSignIn,
    signOut: signOut
  }
})();

function onSignIn(googleUser) {
  todo.onSignIn(googleUser);
}

function signOut() {
  todo.signOut();
  return false;
}

// $(".btn.btn-outline-success.my-2.my-sm-0").on("click", function (e) {
//   console.log(e);
//   e.preventDefault();
// })