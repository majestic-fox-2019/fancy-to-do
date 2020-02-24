$(function(){
    $("#create-todo-section").hide()
    $("#create-todo-project-section").hide()
    $("#todo-list-section").hide()
    $("#delete-confirmation").hide()
    $("#delete-confirmation-project").hide()
    $("#project-list-section").hide()
    $("#project-detail-section").hide()

    if(localStorage.token){
        $('#login-section').empty()
        showList()
    }

    //show add todo form
    $(document).on('click','#todo-btn-add',function(){
        showAddTodo()
    })  
    
    //show add todo-project form
    $(document).on('click','#todo-project-btn-add',function(){
        let id = $(this).attr('id')
        showAddTodoProject(id)
    }) 
    
    //cancel add todo
    $(document).on('click','#todo-btn-cancel', function(){
        showList()
        $("#create-todo-section").slideUp('slow')
    })
    
    //cancel add todo project
    $(document).on('click','#todo-project-btn-cancel', function(){
        $("#create-todo-project-section").slideUp('slow')
    })
    
    //add todo
    $(document).on('click','#todo-btn-submit',function(){
        addTodo()
        $("#create-todo-section").fadeOut('slow')
    })  
    
    //add todo project
    $(document).on('click','#todo-project-btn-submit',function(){
        addTodoProject()
        $("#create-todo-project-section").fadeOut('slow')
    })  

    //toggle todo status
    $(document).on('click','.todo-checkbox-status',function(){
        // console.log(document.getElementsByClassName('todo-checkbox-status').checked)
        
        let id = $(this).attr('id')
        console.log(id)
        $.ajax({
            url : "http://localhost:3000/todo/status/"+id,
            type : 'put',
            headers : {
                token : localStorage.token
            },
            success : (response)=>{
                console.log('masuk sini')
                console.log(response)
            },
            error : (err)=>{
                console.log('masuk error')
                console.log(err)
            }
        })
    })  

    //delete todo
    $(document).on('click','.todo-btn-delete',function(){
        let id = $(this).attr('id')
        console.log(id)
        deleteTodo(id)
    }) 

    //delete project
    $(document).on('click', '.project-btn-delete', function(){
        let id = $(this).attr('id')
        deleteProject(id)
    })
    
    //edit todo
    $(document).on('click','.todo-btn-edit',function(){
        let id = $(this).attr('id')
        console.log(id)
        showEditTodo(id)    
        editTodo(id)    
    }) 
    
    //sign in
    $(document).on('click','#btn-sign-in',function(){
        signIn()
    }) 
    
    //sing out
    $(document).on('click','#btn-sign-out',function(){
        localStorage.removeItem('token')
        $("#create-todo-section").hide()
        $("#todo-list-section").hide()
        $("#delete-confirmation").hide()
        $('#login-section').append(`
        <div>
        <div class="form-group">
          <div id="sign-error-section">
            
          </div>
          <input id="email-sign-in" type="text" class="form-control mb-3" name="" id="signin-email" aria-describedby="helpId" placeholder="email" style="width: 25%;">
          <input id="password-sign-in" type="password" class="form-control" name="" id="signin-password" aria-describedby="helpId" placeholder="password" style="width: 25%;">
        </div>
        <div class="d-flex justify-content-center">
          <a id="btn-sign-in" class="btn btn-secondary text-white m-2">Sign in</a>
          <a id="btn-sign-up" class="btn btn-dark text-white m-2">Sign up</a>
        </div>
        <div class="g-signin2 p-2" data-onsuccess="onSignIn"></div>
      </div>
        `)
    }) 

    //cancel edit
    $(document).on('click','#todo-btn-edit-cancel', function(){
        $('#edit-todo-section').slideUp('slow')
    })
    
    //show project
    $(document).on('click', '#project-btn', function(){
        showProjectList()
    })
    
    //show solo todos
    $(document).on('click', '#solo-btn', function(){
        $("#project-list-section").slideUp('slow')
        showList()
    })

    //show todos on the project
    $(document).on('click','.project-btn-show', function(){
        let id = $(this).attr('id')
        localStorage.projectId = id
        $('#project-list-section').slideUp('slow')
        showProjectDetail(id)
    })
})

