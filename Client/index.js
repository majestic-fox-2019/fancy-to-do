$(document).ready(function(){

var submitForm = $('#submitForm')
var loginForm = $('#loginForm')
var showRegis = $('#showRegis')
var add = $('#addbutton')
var Login= $('.login')
var table = $('.table_todo')
const server = 'http://localhost:3000'


submitForm.hide()
if(!localStorage.getItem('token')){
    Login.show()
    table.hide()
    add.hide()
}
else{
    // registration.hide()
    showToDoList()
    Login.hide()
    table.show()
    add.show()
}



var add = function(username,password,email,name){
    $.ajax({
        method: 'POST',
        url:`${server}/register`,
        contentType: "application/json; charset=utf-8",
        data:
        JSON.stringify({
            username:username,
            name: name,
            email:email,
            password:password,

        }),
         // this
    })
    .done(function(data){
        console.log(data)
        submitForm.hide()
        Login.show()
    })
    .fail(function(error) {
        console.log(error)
    })
    
}

var login = function(email,password){
    $.ajax({
        method: 'POST',
        url:`${server}/login`,
        contentType: "application/json; charset=utf-8",
        data:
        JSON.stringify({
            email:email,
            password:password,

        }),
         // this
    })
    .done(function(data){
        console.log(data)
        Login.hide()
        localStorage.setItem("token",data)
        table.show()
        showToDoList()
    })
    .fail(function(error) {
        console.log(error)
    })
}

showRegis.on('click',function(e){
    submitForm.show()
    Login.hide()

})

submitForm.on('submit',function(e){
    e.preventDefault()
    var name = $('#name').val()
    var username = $('#username').val()
    var email = $('#email').val()
    var password = $('#password').val()
    add(username,password,email,name)
})

loginForm.on('submit',function(e){
    e.preventDefault()
    var email = $('#emailLogin').val()
    var password = $('#passwordLogin').val()
    login(email,password)
})


var tbody = $('#tbodies')

var template = ` <tr>
                    <td class = "id"></td>
                    <td class = "title"></td>
                    <td class = "description"></td>
                    <td class = "status"></td>
                    <td class = "due_date"></td>
                    <td class = "temperature"></td>
                    <td class ="delete">
                        <a id="deletetodo" class ="btn btn-primary btn-danger" role="button">delete</a>
                        <a id="updatetodo" class ="btn btn-primary btn-primary" role="button" data-toggle="modal" data-target ="#updateModal">update</a></td>
                </tr>`

function showTemplate(data){
    tbody.empty()
    for(let i = 0; i < data.length;i++){
        // console.log(data)
        var $item = $(template)
        $item.find('.id').text(data[i].id)
        $item.find('.title').text(data[i].title)
        $item.find('.description').text(data[i].description)
        $item.find('.status').text(data[i].status)
        $item.find('.due_date').text(data[i].due_date)
        $item.find('.temperature').text(data[i].temperature)
        $item.find('#deletetodo').prop('href',`${server}/todos/${data[i].id}`)
        $item.find('#updatetodo').prop('href',`${server}/todos/${data[i].id}`)
        // $('#editTodo').prop('href',`${server}/todos/${data[i].id}`)

        tbody.append($item)
        // console.log($item)
    }
    // console.log(tbody)
}

function showToDoList(){
    return $.ajax({
        method:'GET',
        url:`${server}/todos`,
        headers:{
            token:localStorage.token
        }
    })
    .done(function(data){
        // console.log('masuk')
        console.log(data)
        showTemplate(data)
    })
    .fail(function(data){
        console.log(error)
    })
}

var Todo = $('#addForm')
Todo.on('submit',function(e){
    e.preventDefault()
    var title = $('#titleAdd').val()
    var description = $('#descriptionAdd').val()
    var status = $('#statusAdd').val()
    var due_date = $('#due_dateAdd').val()
    addTodo(title,description,status,due_date)
})

var addTodo = function(title,description,status,due_date){
    $.ajax({
        headers:{
            token:localStorage.token
        },
        method: 'POST',
        url:`${server}/todos`,
        contentType: "application/json; charset=utf-8",
        data:
        JSON.stringify({
            title:title,
            description:description,
            status:status,
            due_date:due_date

        })
         // this
    })
    .done(function(data){
        showToDoList()
    })
    .fail(function(error) {
        console.log(error)
    })
    
}

$(this).click(function (e){
    if(document.activeElement.id == "deletetodo"){
        // console.log('masuk')
        e.preventDefault()
        deleteTodo(document.activeElement.href)
    }
    else if(document.activeElement.id == "updatetodo"){
        e.preventDefault()
        getModalUpdate(document.activeElement.href)
        
    }
})

function deleteTodo(url) {
    return $.ajax({
        method:'DELETE',
        url:url,
        headers:{
            token:localStorage.token
        },
        contentType: "application/json; charset=utf-8"
    })
    .done(function(data){
        console.log(data)
        showToDoList()
    })
    .fail()
}

$('#editForm').on('submit',function(e){
        
    var title = $('#titleEdit').val()
    var description = $('#descriptionEdit').val()
    var status = $('#statusEdit').val()
    var due_date = $('#due_dateEdit').val()
    e.preventDefault()
    $.ajax({
        method:'PUT',
        url:`http://localhost:3000/todos/${localStorage.id}`,
        headers:{
            token:localStorage.token
        },
        contentType: "application/json; charset=utf-8",
        data:
        JSON.stringify({
            title:title,
            description:description,
            status:status,
            due_date:due_date

        })
    })
    .done(function(data){
        console.log("masuk")
        // localSt
        $('#updateModal').modal('hide')
        showToDoList()
    })
    .fail(function(err){
        console.log(err)
    })

})


function getModalUpdate(url){
$.ajax({
    headers:{token:localStorage.token},
    url:url
})
.done(function(data){
    localStorage.setItem('id',data.id)
    $('#titleEdit').val(data.title)
    $('#descriptionEdit').val(data.description)
    $('#statusEdit').val(data.status)
})
.fail(function (error) {
    console.log(error)
})
}
})


    
    
    













    




