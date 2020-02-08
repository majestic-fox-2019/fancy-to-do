$.ajax({
    type: "GET",
    url: `${BACKEND_URL}/users`,
    headers: {
        accesstoken: localStorage.getItem("accesstoken")
    }
})
.then(users => {
    $("#dataUsers").empty();
    let userTemplates = ``;
    users.forEach((user, index) => {
        userTemplates += `
            <tr>
                <td>
                    <h2 class="ui center aligned header">${index+1}</h2>
                </td>
                <td>${user.email}</td>
                <td>${formatDate(user.createdAt)}</td>
                <td>${formatDate(user.updatedAt)}</td>
            </tr>
        `
    });
    $("#dataUsers").append(userTemplates)
})
.catch(err => {
    console.log({err});
});