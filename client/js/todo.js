$("#todo").on('click ready', function() {
    $.ajax({
        method: "GET",
        url: `${BACKEND_URL}/todos`,
        headers: {
            accesstoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrb2Rla2l0ZUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MDgyNjZ9.lbrWxM7ItZtsZD2DYnzNTWuB8YdM31i_YxokfkCcbYY"
        }
    })
    .then(todos => {
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
                        
                    </td>
                </tr>
            `
        });
        $("#dataTodos").append(todoTemplates)
    })
    .catch(err => {
        console.log({err});
    })
    
});