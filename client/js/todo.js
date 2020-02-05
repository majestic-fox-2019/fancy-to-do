$(document).ready(function() {
    const clearForm = () => {
        $("#input_title").val("");
        $("#input_description").val("");
        $("#input_due_date").val("");
    }

    const openModal = () => {
        $('.ui.modal.modalTodo').modal('show');        
    };

    const closeModal = () => {
        $('.ui.modal.modalTodo').modal('hide');        
    }
    
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
                        <td>
                            ${todo.description}
                        </td>
                        <td>
                            ${todo.status}
                        </td>
                        <td>${formatDate(todo.createdAt)}</td>
                        <td>${formatDate(todo.updatedAt)}</td>
                        <td>
                            <button class="ui green button goblok" id="edit${todo.id}">
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
        openModal();        
    });

    $("#btnSubmitForm").unbind().on('click', function() {
        let title           = $("#input_title").val();
        let description     = $("#input_description").val();
        let due_date        = $("#input_due_date").val();

        $.ajax({
            type: "POST",
            url: `${BACKEND_URL}/todos`,
            data: {title, description, due_date},
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
    });

    $(document).unbind().on('click',  '[id^=edit]', function() {
        let idTodo = $(this).attr("idtodo");
        openModal();
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