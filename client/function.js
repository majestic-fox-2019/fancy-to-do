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
            project = "Personal"
        } else {
            let nama = getNameProject(i.ProjectId)
            project = "Project"
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
    getTodoById(id, "editVanilla")

}

function getTodoById(id, statusedit) {
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
            if (statusedit == "editVanilla") {
                $("#modalku").modal("show")
                $("#titleEdit").val(resultGet.title)
                $("#descriptionEdit").val(resultGet.description)
                $("#statusEdit").children(`[value="${statusNya}"]`).attr('selected', true);
            } else {
                $("#modalEditTodoProject").modal("show")
                $("#titleEditTP").val(resultGet.title)
                $("#descriptionEditP").val(resultGet.description)
                $("#statusEditP").children(`[value="${statusNya}"]`).attr('selected', true);
            }
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
    if (responseGetProject.length > 0) {
        for (let perProject of responseGetProject) {
            appendProject += `
            <div class="card-header projectHeader text-align-center animated slideInUp">
                <div class= "d-flex mx-auto justify-content-between align-self-center">
                    <div class="d-flex">
                        ${perProject.Project.name}
                    </div>
                    <div class="d-flex">
                        <div class="btn btn-primary" onclick="newTodoProject(${perProject.ProjectId})" >New Todo</div>
                        <div class="btn btn-primary mx-2" onclick="preInvite(${perProject.ProjectId})">Invite Member</div>
                        <div class="btn btn-primary" onclick="previewMembers(${perProject.ProjectId})">See Member</div>
                    </div>
                </div>

                </div>
            </div>
            <div class="card-body cardIsian overflow-auto animated slideInUp">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
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
    } else {
        appendProject += `
        <div class="d-flex mx-auto justify-content-center text-align-center">
            <h2>This project has no to do list. Create a new one.</h2>
        </div>
        `
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
        // let members = getMembers(satuan.ProjectId)
        // console.log(members, "<<ini members")
        // let assigned = getUserById(satuan.UserId)
        let statusnya
        if (satuan.status) {
            statusnya = "Done"
        } else {
            statusnya = "Not Done"
        }
        let tanggal = new Date(satuan.due_date).toDateString()
        untukDiAppend += `
        <tr id=${satuan.id}>
        <td>${satuan.title}</td>
        <td>${satuan.description}</td>
        <td>${statusnya}</td>
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

function getUserById(id) {
    $.ajax(`${baseUrl}/user/${id}`, {
        type: "GET",
        success: function (hasilnya) {
            // console.log(hasilnya.username, "<<ini username")
            $("#assigned" + id).text(hasilnya.username)
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
    // .done(hasilnya => {
    //     // console.log(hasilnya)
    //     return hasilnya
    // })
}

function preeditTodoProject(id) {
    idTodoForEditProject = id
    getTodoById(id, "editTodoProject")
}


function editTodoProject(id, title, status, due_date, description) {
    $.ajax(`${baseUrl}/projects/todo/${id}`, {
        type: "PUT",
        data: {
            title,
            status,
            due_date,
            description
        },
        headers: {
            token: localStorage.getItem("token")
        },
        success: function () {
            $("#modalEditTodoProject").modal("hide")
            getMyProjects()
        },
        error: function (err) {
            // console.log(err)
            let errorMessage = err.responseJSON

            swal('Oops...', errorMessage, "error")
        }
    })
}

function predeleteTodoProject(id) {
    $("#modalDeleteTodoProject").modal("show")
    $("#deleteTodoProject").click(function () {
        $.ajax(`${baseUrl}/projects/todo/${id}`, {
            type: "DELETE",
            headers: {
                token: localStorage.getItem("token")
            },
            success: function () {
                $("#modalDeleteTodoProject").modal("hide")
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
    })
}

function newTodoProject(idProject) {
    $("#newTodoModalProject").modal("show")
    $("#createTodoProject").click(function () {
        let due_date = $("#dueDateTodoProject").val()
        let title = $("#titleTodoProject").val()
        let description = $("#descriptionTodoProject").val()
        let status = false
        createTodoProject(idProject, due_date, title, description, status)
    })
}

function createTodoProject(id, due_date, title, description, status) {
    $.ajax(`${baseUrl}/projects/todo/${id}`, {
        type: "POST",
        data: {
            due_date,
            title,
            description,
            status
        },
        headers: {
            token: localStorage.getItem("token")
        },
        success: function () {
            $("#newTodoModalProject").modal("hide")
            getMyProjects()
        },
        error: function (err) {
            let errorMessage = err.responseJSON

            swal('Oops...', errorMessage, "error")
        }
    })
}

function previewMembers(id) {
    // $("#memberList").modal("show")
    $.ajax(`${baseUrl}/projects/all/members/${id}`, {
        type: "GET",
        success: function (allMembers) {
            // console.log(allMembers, "ini allMembers")
            let isinya = listingMembers(allMembers)
            $("#membersLoop").empty()
            $("#membersLoop").append(isinya)
            $("#memberList").modal("show")
        },
        error: function (err) {
            swal('Oops...', err.responseJSON, "error")
        }
    })
        .then(listMember => {
            return listMember
        })
}

function listingMembers(membersnya) {
    // console.log(membersnya, "<<")
    let appendan = ""
    for (let i of membersnya) {
        // console.log(i, "<<")
        appendan += `
        <div class="d-flex justify-content-between">
        <p>${i.User.username}</p>
        <p> ${i.User.email}</p>

        </div>
        `
    }
    return appendan

}
function preInvite(id) {
    // $.ajax(`${baseUrl}/projects/addMember/`)
    $("#inviteMember").modal("show")
    $("#inviteThisMember").click(function () {
        let email = $("#emailMember").val()
        inviteMember(id, email)
    })
}

function inviteMember(id, email) {
    $.ajax(`${baseUrl}/projects/addMember/${id}`, {
        type: "POST",
        data: {
            email
        },
        headers: {
            token: localStorage.getItem("token")
        },
        success: function (hasinya) {
            // console.log(hasinya)
            getMyProjects()
            swal("Yay!", "Member has been successfully added!", "success")
        },
        error: function (err) {
            // console.log(err, "<<")
            let errMessage
            if (typeof err.responseJSON == "string") {
                errMessage = err.responseJSON
            } else {
                errMessage = err.responseJSON.message
            }
            swal("Oops..", errMessage, "error")
        }
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax(`${baseUrl}/user/google`, {
        type: "POST",
        data: {
            id_token
        },
        success: function (succeed) {
            $("#errorMessage").hide()
            console.log(succeed, "<<<<<<")
            localStorage.setItem("token", succeed.token)
            localStorage.setItem("username", succeed.userFromGoogle.username)
            localStorage.setItem("UserId", succeed.userFromGoogle.id)
            $("#loginRegPage").hide()
            $("#main").show()

            $("#UsernameButton").text(function () {
                return succeed.userFromGoogle.username
            })
            getMyTodos()
        },
        error: function (err) {
            console.log(err)
        }
    })
}