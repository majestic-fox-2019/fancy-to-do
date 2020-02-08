function addedProject(nameProject) {
    $.ajax({
        url: `${baseUrl}/projects`,
        method: "POST",
        data: {
            nameProject
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            allProject()
            document.getElementById("addProject").reset()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function allProject() {
    $.ajax({
        url: `${baseUrl}/projects`,
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            checkLogin()
            viewProject(response)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function getMember(projectId) {
    $.ajax({
        url: `${baseUrl}/projects/${projectId}`,
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            $("#idProject").val(`${response.id}`)
            checkLogin()
            viewMember(response)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function deleteProject(projectId) {
    $.ajax({
        url: `${baseUrl}/projects/${projectId}`,
        method: "DELETE",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            allProject()
            viewMember()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function deleteMember(userId, projectId) {
    $.ajax({
        url: `${baseUrl}/projects/member/${projectId}`,
        method: "DELETE",
        data: {
            userId
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            getMember(projectId)
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function addMember() {
    const projectId = $("#idProject").val()
    const email = $('#emailMember').val()
    $.ajax({
        url: `${baseUrl}/projects/member/${projectId}`,
        method: "POST",
        data: {
            email
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            getMember(projectId)
            document.getElementById("emailMember").value = "";
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}