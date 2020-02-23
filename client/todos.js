function showAddTodo(){
    $("#todo-list-section").slideUp('slow')
    $("#create-todo-section").slideDown('slow')
}

function addTodo(){
    console.log('masuk function add todo')
    let title = $("#todo-create-title").val()
    let desc = $("#todo-create-description").val()
    let due_date = $("#todo-create-due-date").val()
    $.ajax({
        url : 'http://localhost:3000/todo/',
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
            showList()
            console.log(response)
            $("#todo-create-title").val('')
            $("#todo-create-description").val('')
            $("#todo-create-due-date").val('')
        },
        error : function({responseJSON}){
            swal.fire(responseJSON.msg)
            showList()
            $("#todo-create-title").val('')
            $("#todo-create-description").val('')
            $("#todo-create-due-date").val('')
        }
    })
}

function deleteTodo(id){
    $('#delete-confirmation').slideDown('slow')

    $(document).on('click','#btn-delete-no',function(){
        $('#delete-confirmation').slideUp('slow')
    })

    $(document).on('click','#btn-delete-yes',function(){
        $.ajax({
            url : `http://localhost:3000/todo/${id}`,
            type : 'delete',
            headers : {
                token : localStorage.token
            },
            success : function(response){
                console.log(response)
                $('#delete-confirmation').slideUp('slow')
                showList()
            },
            error : function(err){
                console.log(err)
            }
        })
    })
}

function showEditTodo(id){
    $.ajax({
        url : `http://localhost:3000/todo/${id}`,
        type : 'get',
        headers : {
            token : localStorage.token
        },
        success : function(response){
            let date = new Date(response.due_date).toISOString().substr(0, 10)
            console.log(date)
            $('#edit-todo-section').empty()
            $('#edit-todo-section').append(`
            <div class="row">
            <div class="col-4 p-3 pl-4" align="left">
              <div class="form-group">
                <label for="">Title</label>
                <input type="text" value="${response.title}" class="form-control" name="" id="todo-edit-title" aria-describedby="helpId">
              </div>
              <div class="form-group">
                <label for="">Due Date</label>
                <input type="date" value="${date}" class="form-control" name="" id="todo-edit-due-date" aria-describedby="helpId">
              </div>
            </div>
            <div class='col-8 p-3 pr-4'>
            <div class="form-group">
                <label for="">Description</label>
                <textarea class="form-control" name="" id="todo-edit-description" rows="3">${response.description}</textarea>
                </div>
                <a name="" id="todo-btn-edit-submit" class="btn btn-primary" href="#" role="button">Edit</a>
                <a name="" id="todo-btn-edit-cancel" class="btn btn-primary" href="#" role="button">Cancel</a>
                </div>
                </div>
                `).hide().slideDown('slow')
        },
        error : function(err){
            console.log(err)
        }
    })
}

function editTodo(id){
    $(document).on('click','#todo-btn-edit-submit',function(){
        console.log(id)
        let title = $("#todo-edit-title").val()
        let description = $("#todo-edit-description").val()
        let due_date = $("#todo-edit-due-date").val()
        $.ajax({
            url : `http://localhost:3000/todo/${id}`,
            type : 'put',
            headers : {
                token : localStorage.token
            },
            data : {
                title,
                description,
                due_date
            },
            success : function(response){
                $('#edit-todo-section').empty()
                $('#edit-todo-section').slideUp('slow')
                showList()
            },
            error : function(err){
                console.log(err)
            }
        })
    })
}

function showList(){
    hideAll()
    $("#todo-list-section").slideDown('slow')

    console.log("masuk function show list")
    $.ajax({
        url: 'http://localhost:3000/todo/',
        type: 'get',
        headers: {
            token : localStorage.token
        },
        success : function(response){
            console.log(response)
            $("#todo-cards").empty()
            
            response.forEach(res => {
                let date = new Date(res.due_date)
                let dd = date.getDate()
                let MM = date.getMonth()+1
                let yyyy = date.getFullYear()

                let project = ''
                if(res.ProjectId){
                    project += 'Project '+res.ProjectId
                }

                $("#todo-cards").append(`
                <div id="card" class="card shadow p-3 m-2 mb-5 bg-white rounded" style="border-radius: .75rem!important;width: 20rem;">
                  <img class="card-img-top" src="" alt="">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-10">
                        <h4 id="todo-card-title"class="card-title text-left ">${res.title}</h4>
                        <h6 id="todo-card-Project"class="card-title text-left ">${project}</h6>
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
                        <p id="${res.id}" style="width: 100%;" class="todo-btn-edit btn btn-primary">Edit</p>
                      </div>
                      <div class="col-6">
                        <p id="${res.id}" style="width: 100%;" class="todo-btn-delete btn btn-primary">Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
                `)
            });
        },
        error : function(err){
            $('#todo-list-section').append(`
            <div class="d-flex justify-content-center text-white m-3" style="background-color: tomato; width: 25%;border-radius: .75rem;">
                <h5>${err}</h5>
            </div>
            `).hide().slideDown('slow')
            console.log(err)
        }
    })
}

function hideAll(){
    $("#create-todo-section").slideUp('slow')
    $("#todo-list-section").slideUp('slow')
    $("#delete-confirmation").slideUp('slow')
    $("#delete-confirmation-project").slideUp('slow')
    $("#project-list-section").slideUp('slow')
    $("#project-detail-section").slideUp('slow')
}