    $("#todo").on('click', function() {
        getTodos();
    });
    
    function getTodos() {
        $.ajax({
            method: "GET",
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
                            <button class="ui green button">Edit</button>
                            <button class="ui orange button">Delete</button>
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

    $("#addTodo").click(function() {
        
    });