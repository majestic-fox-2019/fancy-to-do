if (typeof clearForm != 'function') {
    window.clearForm = () => {
        $("#input_id").val("");
        $("#input_title").val("");
        $("#input_description").val("");
        $("#input_due_date").val("");
        $("#input_status").val("");
    }
}

if(typeof openModal != 'function'){
    window.openModal = () => {
        $('.ui.modal.modalTodo').modal('show');        
    };
}

if (typeof closeModal != 'function') {
    window.closeModal = () => {
        $('.ui.modal.modalTodo').modal('hide');        
    }        
}


function updateTodo(id, title, description, due_date, status) {    
    openModal();
    $(".modalTodo .title-modal").text("Edit Todo");

    $(".modalTodo #input_id").val(id);
    $(".modalTodo #input_title").val(title);
    $(".modalTodo #input_description").val(description);
    $(".modalTodo #input_due_date").val(due_date.substr(0, 10));
    $(".modalTodo #input_status").val(status);
}

$(document).ready(function() {    
    const getTodos = () => {
        $.ajax({
            type: "GET",
            url: `${BACKEND_URL}/todos`,
            headers: {
                accesstoken: localStorage.getItem("accesstoken")
            }
        })
        .then(todos => {
            $("#dataTodos").empty();
            let todoTemplates = ``;
            todos.forEach((todo, index) => {
                todoTemplates += `
                    <tr>
                        <td>
                            <h2 class="ui center aligned header">${index+1}</h2>
                        </td>
                        <td>${todo.title}</td>
                        <td>${todo.description}</td>
                        <td>${todo.status}</td>
                        <td>${formatDate(todo.due_date)}</td>
                        <td>${formatDate(todo.createdAt)}</td>
                        <td>${formatDate(todo.updatedAt)}</td>
                        <td>
                            <button class="ui green button" id="edit${todo.id}" onclick="updateTodo(${todo.id},'${todo.title}', '${todo.description}', '${todo.due_date}', '${todo.status}')" idtodo="${todo.id}">
                                <i class="edit icon"></i>
                                Edit
                            </button>
                            <button class="ui orange button" id="delete${todo.id}" idtodo="${todo.id}">
                                <i class="trash icon"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
                `
            });
            $("#dataTodos").append(todoTemplates)
        })
        .catch(err => {
            console.log({err});
        });    
    }


    $("#todo").on('click', function() {
        getTodos();
    });


    $("#addTodo").on('click', function() {
        $(".modalTodo .title-modal").text("Add Todo");
        clearForm();
        openModal();        
    });

    $("#btnSubmitForm").unbind().on('click', function() {
        let id              = $("#input_id").val();
        let title           = $("#input_title").val();
        let description     = $("#input_description").val();
        let due_date        = $("#input_due_date").val();
        let status          = $("#input_status").val();

        if (!id) { // add     
            $.ajax({
                type: "POST",
                url: `${BACKEND_URL}/todos`,
                data: {title, description, due_date, status},
                headers: {
                    accesstoken: localStorage.getItem("accesstoken")
                }
            })
            .then(newTodo => {
                setSuccessAlert();
                showAlert();
                clearForm();
                setTimeout(() => {
                    hideAlert();
                    closeModal();
                    getTodos();
                }, 1000);
    
            })
            .catch(err => {
                setErrorAlert(err);
                showAlert();
                setTimeout(() => {
                    hideAlert();
                }, 3000);
            })        
        }else{ //Edit
            $.ajax({
                type: "PUT",
                url: `${BACKEND_URL}/todos/${id}`,
                data: {title, description, due_date, status},
                headers: {
                    accesstoken: localStorage.getItem("accesstoken")
                }
            })
            .then(updatedTodo => {
                setSuccessAlert();
                showAlert();
                clearForm();
                setTimeout(() => {
                    hideAlert();
                    closeModal();
                    getTodos();
                }, 1000);
    
            })
            .catch(err => {
                setErrorAlert(err);
                showAlert();
                setTimeout(() => {
                    hideAlert();
                }, 3000);
            })            
        }

    });


    $("[id^=edit]").on('click', function() {
        alert($(this).attr('id'));
    })

    $(document).unbind().on('click',  '[id^=edit]', function() {
        alert("terimakasih tongfang");
    });  

    $(document).unbind().on('click',  '[id^=delete]', function() {
        let idTodo = $(this).attr("idtodo");
        if (idTodo && confirm("Are you sure you want to delete task?") == true) {            
            $.ajax({
                type: "DELETE",
                url: `${BACKEND_URL}/todos/${idTodo}`,
                headers: {
                    accesstoken: localStorage.getItem("accesstoken")
                }
            })
            .then(deletedTodo => {
                setSuccessAlert();
                showAlert();
                clearForm();
                setTimeout(() => {
                    hideAlert();
                    closeModal();
                    getTodos();
                }, 1000);
    
            })
            .catch(err => {
                setErrorAlert(err);
                showAlert();
                setTimeout(() => {
                    hideAlert();
                }, 3000);
            })
        }
    });


});