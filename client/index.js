let baseUrl = "http://localhost:3000"
let idTodoForEdit
$(window).on("load", function () {
    let token = localStorage.getItem("token")
    let username = localStorage.getItem("username")
    if (token) {
        $("#loginRegPage").hide()
        $("#errorMessage").hide()
        $("#main").show()
        $("#myProjectsku").hide()
        $("#UsernameButton").text(function () {
            return username
        })
        getMyTodos()
    } else {
        $("#loginRegPage").show()
        $("#errorMessage").hide()
        $("#main").hide()
    }
})

$(document).ready(function () {
    $("#login-tab").click(function () {
        $("#errorMessage").hide()
    })
    $("#Register-tab").click(function () {
        $("#errorMessage").hide()
    })
    $("#login").click(function () {
        let email = $("#emailLogin").val()
        let password = $("#passwordLogin").val()
        login(email, password)
    })
    $("#logout").click(function () {
        logout()
    })
    $("#registerButton").click(function () {
        let email = $("#emailRegister").val()
        let password = $("#passwordRegister").val()
        let username = $("#usernameRegister").val()
        register(email, password, username)
    })
    $("#createTodo").click(function () {
        let due_date = $("#dueDateModal").val()
        let title = $("#titleTodo").val()
        let description = $("#descriptionModal").val()
        let status = false
        createTodo(due_date, title, description, status)
    })
    $("#editThis").click(function () {
        let title = $("#titleEdit").val()
        let id = idTodoForEdit
        let statusAwal = $("#statusEdit").val()
        let status
        if (statusAwal == "Done") {
            status = true
        } else {
            status = false
        }
        let due_date = $("#dueDateEdit").val()
        let description = $("#descriptionEdit").val()
        editTodo(id, title, status, due_date, description)
    })
    $("#backToTodo").click(function () {
        $("#vanillaTodo").show()
        $("#myProjectsku").hide()
        getMyTodos()
    })
    $("#toProjects").click(function () {
        $("#vanillaTodo").hide()
        $("#myProjectsku").show()
        getMyProjects()
    })
    $("#createProject").click(function () {
        let name = $("#projectNameCreate").val()
        addProject(name)
    })
})

function login(email, password) {
    $.ajax(`${baseUrl}/user/login`, {
        type: "POST",
        data: {
            email,
            password
        },
        success: function (succeed) {
            $("#errorMessage").hide()
            localStorage.setItem("token", succeed.token)
            localStorage.setItem("username", succeed.userFound.username)
            localStorage.setItem("UserId", succeed.userFound.id)
            $("#loginRegPage").hide()
            $("#main").show()

            $("#UsernameButton").text(function () {
                return succeed.userFound.username
            })
            getMyTodos()
        },
        error: function (err) {
            $("#errorMessage").text(function () {
                return err.responseJSON
            })
            $("#errorMessage").show()
        }
    })
}

function logout() {
    localStorage.clear()
    $("#loginRegPage").show()
    $("#errorMessage").hide()
    $("#main").hide()
}

function register(email, password, username) {
    $.ajax(`${baseUrl}/user/register`, {
        type: "POST",
        data: {
            email,
            password,
            username
        },
        success: function (registered) {
            $("#errorMessage").hide()
            localStorage.setItem("token", registered.token)
            localStorage.setItem("username", registered.userRegistered.username)
            localStorage.setItem("UserId", registered.userRegistered.id)
            $("#loginRegPage").hide()
            $("#main").show()

            $("#UsernameButton").text(function () {
                return registered.userRegistered.username
            })
            getMyTodos()

        },
        error: function (err) {
            let pesanerror = ""
            for (let i = 0; i < err.responseJSON.length; i++) {

                if (i == err.responseJSON.length - 1) {
                    pesanerror += err.responseJSON[i]
                } else {
                    pesanerror += err.responseJSON[i] + ", "
                }
            }

            $("#errorMessage").text(function () {
                return pesanerror
            })
            $("#errorMessage").show()
        }
    })
}

function getMyTodos() {
    $.ajax(`${baseUrl}/todos/all/mine`, {
        type: "GET",
        headers: {
            token: localStorage.getItem("token")
        },
        success: function (allMine) {
            $(".bodyNotDone").empty()
            $(".bodyDone").empty()
            let done = []
            let notDone = []
            for (let i of allMine) {
                if (i.status) {
                    done.push(i)
                } else {
                    notDone.push(i)
                }
            }
            let isianNotedone = generateTable(notDone)

            $(".bodyNotDone").append(isianNotedone)
            let isianDone = generateTable(done)
            $(".bodyDone").append(isianDone)
        },
        error: function (err) {
            // console.log(err)
            swal('Oops...', 'Something went wrong!', "error")
        }
    })
}

function generateTable(isi) {
    let forAppend = ""
    for (let i of isi) {
        let tanggal = new Date(i.due_date).toDateString()
        let project

        if (i.ProjectId == null) {
            project = "Individual"
        } else {
            let nama = getNameProject(i.ProjectId)
            project = nama
        }
        forAppend += `
        <tr id=${i.id}>
        <td>${i.title}</td>
        <td>${i.description}</td>
        <td>${tanggal}</td>
        <td id="project_${i.id}">${project}</td>
        <td>
        <div class="d-flex">
        <div class="btn btn-primary" data-toggle="modal" data-target="#${i.id}" onclick="preedit(${i.id})">Edit</div>
        <div class="btn btn-danger" id="${i.id}" onclick="predelete(${i.id})">Del</div>
        </div>
        </td>
        </tr>
        `

    }
    return forAppend
}

function createTodo(due_date, title, description, status) {
    $.ajax(`${baseUrl}/todos/`, {
        type: "POST",
        headers: {
            token: localStorage.getItem("token")
        },
        data: {
            due_date,
            title,
            description,
            status
        },
        success: function () {
            getMyTodos()
        },
        error: function (err) {
            let errorMessage = ""
            for (let j = 0; j < err.responseJSON.length; j++) {
                if (j == err.responseJSON.length - 1) {
                    errorMessage += err.responseJSON[j]
                } else {
                    errorMessage += err.responseJSON[j] + ", "
                }
            }
            swal('Oops...', errorMessage, "error")
        }
    })
}

function getNameProject(id) {
    // console.log(id, "<<")
    $.ajax(`${baseUrl}/projects/api/name/${id}`, {
        type: "GET",
        success: function (found) {
            // console.log(found.name, id, "<<")
            if (found) {
                // console.log("hai")
                $(`#project_${id}`).text(found.name)
                // $("#project_" + id).text("meong")
            } else {
                $("#project_" + id).text("deleted project")
            }
        },
        error: function (err) {
            swal('Oops...', err, "error")
        }
    })
}

function preedit(id) {
    idTodoForEdit = id
    getTodoById(id)

}

function getTodoById(id) {
    $.ajax(`${baseUrl}/todos/${id}`, {
        type: "Get",
        success: function (resultGet) {
            let date = new Date(resultGet.due_date).toDateString()
            let statusNya
            if (resultGet.status) {
                statusNya = "Done"
            } else {
                statusNya = "Not Done"
            }
            $("#modalku").modal("show")
            $("#titleEdit").val(resultGet.title)
            $("#descriptionEdit").val(resultGet.description)
            // $("#dueDateEdit").val(date)
            $("#statusEdit").children(`[value="${statusNya}"]`).attr('selected', true);
        },
        error: function (err) {
            swal("Oops...", err, "error")
        }
    })
}

function editTodo(id, title, status, due_date, description) {
    // console.log(id, title, description, status, due_date)
    $.ajax(`${baseUrl}/todos/${id}`, {
        type: "PUT",
        headers: {
            token: localStorage.getItem("token")
        },
        data: {
            status,
            title,
            description,
            due_date
        },
        success: function () {
            $("#modalku").modal("hide")
            getMyTodos()
        },
        error: function (err) {
            let errorMessage = ""
            for (let j = 0; j < err.responseJSON.length; j++) {
                if (j == err.responseJSON.length - 1) {
                    errorMessage += err.responseJSON[j]
                } else {
                    errorMessage += err.responseJSON[j] + ", "
                }
            }
            swal('Oops...', errorMessage, "error")
        }
    })
}

function predelete(id) {
    $("#modalDelete").modal("show")
    $("#deleteTodo").click(function () {
        $.ajax(`${baseUrl}/todos/${id}`, {
            type: "DELETE",
            headers: {
                token: localStorage.getItem("token")
            },
            success: function () {
                $("#modalDelete").modal("hide")
                getMyTodos()
            },
            error: function (err) {
                let errorMessage = ""
                for (let j = 0; j < err.responseJSON.length; j++) {
                    if (j == err.responseJSON.length - 1) {
                        errorMessage += err.responseJSON[j]
                    } else {
                        errorMessage += err.responseJSON[j] + ", "
                    }
                }
                swal('Oops...', errorMessage, "error")
            }
        })
    })
}

function getMyProjects() {
    $.ajax(`${baseUrl}/projects/myProjects`, {
        type: "GET",
        headers: {
            token: localStorage.getItem("token")
        },
        success: function (gotResponse) {

            $("#cardProject").empty()
            let isianCardProject = generateCardProject(gotResponse)
            $("#cardProject").append(isianCardProject)
        },
        error: function (err) {
            let errorMessage = ""
            for (let j = 0; j < err.responseJSON.length; j++) {
                if (j == err.responseJSON.length - 1) {
                    errorMessage += err.responseJSON[j]
                } else {
                    errorMessage += err.responseJSON[j] + ", "
                }
            }
            swal('Oops...', errorMessage, "error")
        }
    })
}

function generateCardProject(responseGetProject) {
    let appendProject = ""
    for (let perProject of responseGetProject) {
        appendProject += `
        <div class="card-header projectHeader text-align-center">
        ${perProject.Project.name}
        </div>
        <div class="card-body cardIsian overflow-auto" id="bodyProject${responseGetProject.ProjectId}">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Action</th>
                    </tr>
                </thead>    
                <tbody id="bodyProject${perProject.ProjectId}" ></tbody>
            </table>
        </div>
        `
        getTodoInProject(perProject.ProjectId)
        // console.log(perProject.ProjectId, "<<<<")
    }
    return appendProject
}

function addProject(name) {
    $.ajax(`${baseUrl}/projects/`, {
        type: "POST",
        headers: {
            token: localStorage.getItem("token")
        },
        data: {
            name
        },
        success: function () {
            getMyProjects()
        },
        error: function (err) {
            let errorMessage = ""
            for (let j = 0; j < err.responseJSON.length; j++) {
                if (j == err.responseJSON.length - 1) {
                    errorMessage += err.responseJSON[j]
                } else {
                    errorMessage += err.responseJSON[j] + ", "
                }
            }
            swal('Oops...', errorMessage, "error")
        }
    })
}

function getTodoInProject(id) {
    $.ajax(`${baseUrl}/projects/all/todo/${id}`, {
        type: "GET",
        success: function (hasilGet) {
            // console.log(hasilGet)
            $(`#bodyProject${id}`).empty()
            let untukbodyproject = generateTableTodoProject(hasilGet)
            $(`#bodyProject${id}`).append(untukbodyproject)
        },
        error: function (err) {
            let errorMessage = ""
            for (let j = 0; j < err.responseJSON.length; j++) {
                if (j == err.responseJSON.length - 1) {
                    errorMessage += err.responseJSON[j]
                } else {
                    errorMessage += err.responseJSON[j] + ", "
                }
            }
            swal('Oops...', errorMessage, "error")
        }
    })
}

function generateTableTodoProject(hasilGet) {
    let untukDiAppend = ""
    for (let satuan of hasilGet) {
        let tanggal = new Date(satuan.due_date).toDateString()
        untukDiAppend += `
        <tr id=${satuan.id}>
        <td>${satuan.title}</td>
        <td>${satuan.description}</td>
        <td>${tanggal}</td>
        <td>
        <div class="d-flex">
        <div class="btn btn-primary" data-toggle="modal" data-target="#${satuan.id}" onclick="preeditTodoProject(${satuan.id})">Edit</div>
        <div class="btn btn-danger" id="${satuan.id}" onclick="predeleteTodoProject(${satuan.id})">Del</div>
        </div>
        </td>
        </tr>
        `
    }
    return untukDiAppend
}