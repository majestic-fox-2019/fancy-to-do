function showAddTodoProject(){
    $("#todo-list-section").slideUp('slow')
    $("#create-todo-project-section").slideDown('slow')
}

function addTodoProject(){
    console.log('masuk function add todo project')
    let title = $("#todo-project-create-title").val()
    let desc = $("#todo-project-create-description").val()
    let due_date = $("#todo-project-create-due-date").val()
    $.ajax({
        url : 'http://localhost:3000/todo?ProjectId='+localStorage.projectId,
        type : 'post',
        headers : {
            token : localStorage.token
        },
        data : {
            title,
            desc,
            due_date
        },
        success : function(response){
            showProjectDetail(localStorage.projectId)
            console.log(response)
            $("#todo-project-create-title").val('')
            $("#todo-project-create-description").val('')
            $("#todo-project-create-due-date").val('')
        },
        error : function({responseJSON}){
            swal.fire(responseJSON.msg)
            showProjectDetail(localStorage.projectId)
            $("#todo-project-create-title").val('')
            $("#todo-project-create-description").val('')
            $("#todo-project-create-due-date").val('')
        }
    })
}

function showProjectList(){
    hideAll()

    $("#project-list-section").slideDown('slow')

    console.log("masuk function show projects")
    $.ajax({
        url: 'http://localhost:3000/project/',
        type: 'get',
        headers: {
            token : localStorage.token
        },
        success : function(response){
            console.log(response)
            $("#project-cards").empty()
            response.forEach(res => {
                let date = new Date(res.due_date)
                let dd = date.getDate()
                let MM = date.getMonth()+1
                let yyyy = date.getFullYear()
                $("#project-cards").append(`
                <div id="card" class="card shadow p-3 m-2 mb-5 bg-white rounded" style="border-radius: .75rem!important;width: 20rem;">
                  <img class="card-img-top" src="" alt="">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-10">
                        <h4 id="project-card-title"class="card-title text-left ">${res.title}</h4>
                      </div>
                      <div class="col-2">
                      </div>
                    </div>
                    <p id="project-card-description" class="card-text text-left">${res.desc}</p>
                    <p id="project-card-due_date" class="card-text text-left">${res.due_date}</p>
                    <p></p>
                    <div class="row">
                      <div class="col-6">
                        <p id="${res.id}" style="width: 100%;" class="project-btn-show btn btn-primary">Show</p>
                      </div>
                      <div class="col-6">
                        <p id="${res.id}" style="width: 100%;" class="project-btn-delete btn btn-primary">Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
                `)
            });
        },
        error : function(err){
            $('#project-list-section').append(`
            <div class="d-flex justify-content-center text-white m-3" style="background-color: tomato; width: 25%;border-radius: .75rem;">
                <h5>${err}</h5>
            </div>
            `).hide().slideDown('slow')
            console.log(err)
        }
    })
}

function showProjectDetail(id){
    console.log(id)
    hideAll()
    $('#project-detail-section').empty()

    $("#project-detail-section").slideDown('slow')

    console.log("masuk function show detail projects")
    $.ajax({
        url: 'http://localhost:3000/project/'+id,
        type: 'get',
        headers: {
            token : localStorage.token
        },
        success : function(response){
            console.log(response)
            $("#todo-on-project-cards").empty()

            $('#project-detail-section').append(`
            <h1>${response.title}</h1>
            <h5 class="pb-3">${response.desc}</h5>
            <p id="todo-project-btn-add" class='btn btn-secondary'>Add todo</p>
            <div class="container">
              <div class="row" id="todo-on-project-cards" class="p-3">

              </div>
            </div>
            `)

            response.Todos.forEach(res => {
                let date = new Date(res.due_date)
                let dd = date.getDate()
                let MM = date.getMonth()+1
                let yyyy = date.getFullYear()
                $("#todo-on-project-cards").append(`
                <div id="card" class="card shadow p-3 m-2 mb-5 bg-white rounded" style="border-radius: .75rem!important;width: 20rem;">
                  <img class="card-img-top" src="" alt="">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-10">
                        <h4 id="todo-card-title"class="card-title text-left ">${res.title}</h4>
                      </div>
                      <div class="col-2">
                        <input id="${res.id}" class="todo-checkbox-status" type="checkbox" name="done" style="transform: scale(1.5);" ${status}>
                      </div>
                    </div>
                    <p id="todo-card-description" class="card-text text-left">${res.desc}</p>
                    <p id="todo-card-due_date" class="card-text text-left">${res.due_date}</p>
                    <p></p>
                    <div class="row">
                      <div class="col-6">
                        <p id="${res.id}" style="width: 100%;" class="todo-project-btn-edit btn btn-primary">Edit</p>
                      </div>
                      <div class="col-6">
                        <p id="${res.id}" style="width: 100%;" class="todo-project-btn-delete btn btn-primary">Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
                `)
            });
        },
        error : function(err){
            $('#project-list-section').append(`
            <div class="d-flex justify-content-center text-white m-3" style="background-color: tomato; width: 25%;border-radius: .75rem;">
                <h5>${err}</h5>
            </div>
            `).hide().slideDown('slow')
            console.log(err)
        }
    })
}

function deleteProject(id){
    $('#delete-confirmation-project').slideDown('slow')

    $(document).on('click','#btn-delete-project-no',function(){
        $('#delete-confirmation-project').slideUp('slow')
        showProjectList()
    })

    $(document).on('click','#btn-delete-project-yes',function(){
        $.ajax({
            url : `http://localhost:3000/project/${id}`,
            type : 'delete',
            headers : {
                token : localStorage.token
            },
            success : function(response){
                console.log(response)
                $('#delete-confirmation-project').slideUp('slow')
                showProjectList()
            },
            error : function(err){
                console.log(err)
            }
        })
    })
}