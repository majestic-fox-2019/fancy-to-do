var todo = function () {
    var $registerButton = {};
    var $loginButton = {};
    var $loginDiv = {}
    var $registerDiv = {}

    var $submitLogin = {};
    var $emailLogin = {};
    var $passwordLogin = {};

    var $submitRegister = {};
    var $emailRegister = {};
    var $passwordRegister = {};

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

    var $login = {};
    var $todo = {};
    var $error = {};

    const baseUrl = "http://localhost:3000";

    function cacheDom() {
        $submitLogin = $("#submitLogin");
        $submitRegister = $("#submitRegister");

        $loginDiv = $("#loginDiv");
        $registerDiv = $("#registerDiv");

        $registerButton = $("#registerButton");
        $loginButton = $("#loginButton");

        $dropdown = $("#dropdown");
        $logout = $("#logout");

        $modalAdd = $("#modalAdd");
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
        $error = $("#errorStatus");
    }

    function bindEvents() {
        $submitLogin.mouseover(function () {
            $(this).css("background-color", "white");
            $(this).css("color", "black");
        });
        $submitLogin.mouseout(function () {
            $(this).css("background-color", "transparent");
            $(this).css("color", "white");
        });
        $submitLogin.on("click", function (e) {
            e.preventDefault();
            $emailLogin = $("#emailLogin").val();
            $passwordLogin = $("#passwordLogin").val();
            login($emailLogin, $passwordLogin);
        });
        $submitRegister.mouseover(function () {
            $(this).css("background-color", "white");
            $(this).css("color", "black");
        });
        $submitRegister.mouseout(function () {
            $(this).css("background-color", "transparent");
            $(this).css("color", "white");
        });
        $submitRegister.on("click", function (e) {
            e.preventDefault();
            $emailRegister = $("#emailRegister").val();
            $passwordRegister = $("#passwordRegister").val();
            register($emailRegister, $passwordRegister);
        });
        $registerButton.on("click", function (e) {
            e.preventDefault();
            $loginDiv.css("display", "none");
            $registerDiv.css("display", "block");
        });
        $loginButton.on("click", function (e) {
            e.preventDefault();
            $loginDiv.css("display", "block");
            $registerDiv.css("display", "none");
        });
        $dropdown.on("click", function () {
            $logout.slideToggle();
        });
        $logout.on("click", function (e) {
            e.preventDefault();
            signOut();
            localStorage.clear();
            checkLocalStorage();
            $logout.slideToggle();
            $emailLogin = $("#emailLogin").val("");
            $passwordLogin = $("#passwordLogin").val("");
            $titleAdd = $("#titleAdd").val("");
            $descriptionAdd = $("#descriptionAdd").val("");
            $("input[id='statusAdd']").prop("checked", false);
            $due_dateAdd = $("#due_dateAdd").val("");
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
                $login.css("display", "none");
                $todo.css("display", "block");
                getData(data.token);
            })
            .fail(err => {
                $error.fadeIn("fast");
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
                $login.css("display", "none");
                $todo.css("display", "block");
                getData(data.token);
            })
            .fail(err => {
                $error.fadeIn("fast");
                getError(err.responseText);
            });
    }

    function register(email, password) {
        $.ajax({
            method: "POST",
            url: `${baseUrl}/register`,
            data: {
                email: email,
                password: password
            }
        })
            .done(data => {
                $loginDiv.css("display", "block");
                $registerDiv.css("display", "none");
                $emailRegister = $("#emailRegister").val("");
                $passwordRegister = $("#passwordRegister").val("");
            })
            .fail(err => {
                $error.fadeIn("fast");
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
                $error.fadeIn("fast");
                getError(err.responseText);
            });
    }

    function setData(arr) {
        empty();
        const email = localStorage.email;
        $userEmail.text(email);
        arr.forEach((el, i) => {
            const due_date = new Date(el.due_date);
            const year = due_date.getFullYear();
            const month = due_date.getMonth();
            const date = due_date.getDate();
            $data.append(`
                <tr>
                    <td>${i + 1}</td>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td><input type="checkbox" class="form-check-input" id="defaultChecked" ${(el.status) ? "checked" : ""} disabled></td>
                    <td>${(date < 10) ? "0" + date : date} - ${(month < 10) ? "0" + (month + 1) : (month + 1)} - ${year}</td >
                    <td>
                        <button onclick="findOne(${el.id})" data-toggle="modal" data-target="#modalEdit" class="btn btn-outline-warning">Edit</button>
                        <button onclick="deleteOne(${el.id})" class="btn btn-outline-danger">Delete</button>
                    </td>
                </tr >
    `);
        });
    }

    function findOne(id) {
        const token = localStorage.token;
        $.ajax({
            method: "GET",
            url: `${baseUrl}/todos/${id} `,
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
                $error.fadeIn("fast");
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
                $titleAdd = $("#titleAdd").val("");
                $descriptionAdd = $("#descriptionAdd").val("");
                $("input[id='statusAdd']").prop("checked", false);
                $due_dateAdd = $("#due_dateAdd").val("");
                getData(token);
            })
            .fail(err => {
                $error.fadeIn("fast");
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
                $error.fadeIn("fast");
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
                $error.fadeIn("fast");
                getError(err.responseText);
            });
    }

    function getError(str) {
        const obj = JSON.parse(str);
        const status = obj.status;
        const message = obj.custom_message;
        setError(status, message);
    }

    function setError(status, message) {
        $error.html(`
            <div class="alert alert-danger" role="alert">
                ${status}: ${message}
            </div >
    `);
        hideError()
    }
    function hideError() {
        setTimeout(() => {
            $error.fadeOut()
        }, 3000);
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