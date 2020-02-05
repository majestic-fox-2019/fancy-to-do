var todo = function () {
    var $submit = {};
    var $add = {};
    var $userEmail = {};
    var $dropdown = {};
    var $logout = {};

    var $modalAdd = {};
    var $titleAdd = {};
    var $descriptionAdd = {};
    var $statusAdd = {};
    var $due_dateAdd = {};

    var $modalEdit = {};
    var $titleEdit = {};
    var $descriptionEdit = {};
    var $statusEdit = {};
    var $due_dateEdit = {};
    var $idEdit = {};

    var $data = {};

    var $email = {};
    var $password = {};

    var $login = {};
    var $todo = {};
    var $error = {};

    const baseUrl = "http://localhost:3000";

    function cacheDom() {
        $submit = $("#submit");
        $modalAdd = $("#modalAdd");
        $dropdown = $("#dropdown");
        $logout = $("#logout");

        $modalEdit = $("#modalEdit");
        $titleEdit = $("#titleEdit");
        $descriptionEdit = $("#descriptionEdit");
        $statusEdit = $("#statusEdit");
        $due_dateEdit = $("#due_dateEdit");
        $idEdit = $("#idEdit");

        $add = $("#submitAdd");
        $edit = $("#submitEdit");
        $userEmail = $("#userEmail");
        $data = $("#data");
        $login = $("#login");
        $todo = $("#todo");
        $error = $("#error");
    }

    function bindEvents() {
        $submit.on("click", function (e) {
            e.preventDefault();
            $email = $("#email").val();
            $password = $("#password").val();
            login($email, $password);
        });
        $dropdown.on("click", function () {
            $logout.slideToggle();
        });
        $logout.on("click", function (e) {
            e.preventDefault();
            const provider = localStorage.provider;
            if (provider == "google") {
                signOut();
                localStorage.clear();
                checkLocalStorage();
            } else if (provider == "mine") {

            }
        });
        $add.on("click", function (e) {
            e.preventDefault();
            $titleAdd = $("#titleAdd").val();
            $descriptionAdd = $("#descriptionAdd").val();
            if ($("input[id='statusAdd']").prop("checked")) {
                $statusAdd = true;
            } else {
                $statusAdd = false;
            }
            $due_dateAdd = $("#due_dateAdd").val();
            $modalAdd.modal('toggle');
            add($titleAdd, $descriptionAdd, $statusAdd, $due_dateAdd);
        });
        $edit.on("click", function (e) {
            e.preventDefault();
            $titleEdit = $("#titleEdit").val();
            $descriptionEdit = $("#descriptionEdit").val();
            if ($("input[id='statusEdit']").prop("checked")) {
                $statusEdit = true;
            } else {
                $statusEdit = false;
            }
            $due_dateEdit = $("#due_dateEdit").val();
            $idEdit = $("#idEdit").val();
            $modalEdit.modal('toggle');
            edit($titleEdit, $descriptionEdit, $statusEdit, $due_dateEdit, $idEdit);
        });
    }

    function checkLocalStorage() {
        const token = localStorage.getItem("token");
        if (token) {
            $login.css("display", "none");
            $todo.css("display", "block");
            getData(token);
        } else {
            $todo.css("display", "none");
            $login.css("display", "block");
        }
    };

    function onSignIn(googleUser) {
        const profile = googleUser.getBasicProfile();
        const email = profile.getEmail();
        $.ajax({
            method: "POST",
            url: `${baseUrl}/signInGoogle`,
            data: {
                email: profile.getEmail()
            }
        })
            .done(data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);
                localStorage.setItem('provider', "google");
                $login.css("display", "none");
                $todo.css("display", "block");
                getData(data.token);
            })
            .fail(err => {
                $login.css("display", "none");
                $error.css("display", "block");
                getError(err.responseText);
            });
    }

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        auth2.disconnect();
    }

    function login(email, password) {
        $.ajax({
            method: "POST",
            url: `${baseUrl}/login`,
            data: {
                email: email,
                password: password
            }
        })
            .done(data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);
                localStorage.setItem('provider', "mine");
                $login.css("display", "none");
                $todo.css("display", "block");
                getData(data.token);
            })
            .fail(err => {
                $login.css("display", "none");
                $error.css("display", "block");
                getError(err.responseText);
            });
    }

    function empty() {
        return $data.empty();
    }

    function getData(token) {
        $.ajax({
            method: "GET",
            url: `${baseUrl}/todos`,
            headers: {
                token: token
            }
        })
            .done(data => {
                setData(data);
            })
            .fail(err => {
                $login.css("display", "none");
                $error.css("display", "block");
                getError(err.responseText);
            });
    }

    function setData(arr) {
        empty();
        const email = localStorage.email;
        $userEmail.text(email);
        arr.forEach((el, i) => {
            $data.append(`
                <tr>
                    <td>${i + 1}</td>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td><input type="checkbox" class="form-check-input" id="defaultChecked" ${(el.status) ? "checked" : ""} disabled></td>
                    <td>${el.due_date}</td>
                    <td>
                        <button onclick="findOne(${el.id})" data-toggle="modal" data-target="#modalEdit" class="btn btn-outline-warning">Edit</button>
                        <button onclick="deleteOne(${el.id})" class="btn btn-outline-danger">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    function findOne(id) {
        const token = localStorage.token;
        $.ajax({
            method: "GET",
            url: `${baseUrl}/todos/${id}`,
            headers: {
                token: token
            }
        })
            .done(data => {
                $titleEdit.val(data.title);
                $descriptionEdit.val(data.description);
                $statusEdit.val(data.status);
                if (data.status) {
                    $statusEdit.prop("checked", true);
                } else {
                    $statusEdit.prop("checked", false);
                }
                const due_date = new Date(data.due_date);
                const year = due_date.getFullYear();
                const month = due_date.getMonth();
                const date = due_date.getDate();
                $due_dateEdit.val(`${year}-${(month < 10) ? "0" + (month + 1) : (month + 1)}-${(date < 10) ? "0" + date : date}`);
                $idEdit.val(data.id);
            })
            .fail(err => {
                $login.css("display", "none");
                $error.css("display", "block");
                getError(err.responseText);
            });
    }

    function add(title, description, status, due_date) {
        const token = localStorage.token;
        $.ajax({
            method: "POST",
            url: `${baseUrl}/todos`,
            headers: {
                token: token
            },
            data: {
                title: title,
                description: description,
                status: status,
                due_date: due_date
            }
        })
            .done(data => {
                getData(token);
            })
            .fail(err => {
                $login.css("display", "none");
                $error.css("display", "block");
                getError(err.responseText);
            });
    }

    function edit(title, description, status, due_date, id) {
        const token = localStorage.token;
        $.ajax({
            method: "PUT",
            url: `${baseUrl}/todos/${id}`,
            headers: {
                token: token
            },
            data: {
                title: title,
                description: description,
                status: status,
                due_date: due_date
            }
        })
            .done(data => {
                getData(token);
            })
            .fail(err => {
                $login.css("display", "none");
                $error.css("display", "block");
                getError(err.responseText);
            });
    }

    function deleteOne(id) {
        const token = localStorage.token;
        $.ajax({
            method: "DELETE",
            url: `${baseUrl}/todos/${id}`,
            headers: {
                token: token
            }
        })
            .done(data => {
                getData(token);
            })
            .fail(err => {
                $login.css("display", "none");
                $error.css("display", "block");
                getError(err.responseText);
            });
    }

    function getError(str) {
        const obj = JSON.parse(str);
        const status = obj.status;
        const message = obj.message;
        setError(status, message);
    }

    function setError(status, message) {
        $error.html(`
            <h1 class="center">${status}</h1>
            <p class="center">${message}</p>
        `);
    }

    cacheDom();
    bindEvents();
    checkLocalStorage();

    return {
        onSignIn: onSignIn,
        signOut: signOut,
        findOne: findOne,
        deleteOne: deleteOne
    }
}();

function onSignIn(googleUser) {
    todo.onSignIn(googleUser)
}

function signOut() {
    todo.signOut()
}

function findOne(id) {
    todo.findOne(id)
}

function deleteOne(id) {
    todo.deleteOne(id)
}