var loginPage = $('#login-page')
let token = localStorage.getItem('token')
var registerPage = $("#register-page")
var local = `http://localhost:3000`
var tableList = $("#tableList")
var templateAdd = ``


$('#login-page').hide()
// registerPage.hide()
tableList.hide()
$("#logout").hide()
$("#addBtn").hide()

$("#register-form").on("submit",(e)=>{
    e.preventDefault()
    $.ajax({
        type: "POST",
        url: `${local}/register`,
        data: {
            email:$("#email").val(),
            username:$("#username").val(),
            password:$("#password").val() 
        }
    })
    .done(res=>{
        registerPage.hide()
        tableList.hide()
        loginPage.show()
        $("#logout").hide()
        $("#addBtn").hide()
        // console.log(res)
    })
    .fail(err=>{
        console.log(err)
    })
})

$("#login-form").on("submit",(e)=>{
    e.preventDefault()
    console.log($("#emailLogin").val())
    console.log($("#passwordLogin").val())
    login()
})

function login() {
    $.ajax({
        type: "POST",
        url: `${local}/login`,
        data: {
            email:$("#emailLogin").val(),
            password:$("#passwordLogin").val()
        }
})
.done(res=>{
    localStorage.setItem("token", res.token)
    console.log(res.token);
    registerPage.hide()
    loginPage.hide()
    tableList.show()
    $("#logout").show()
    $("#addBtn").show()
    // console.log("ini berhasil")
})
.fail(err=>{
    console.log(err)
})
}

function getList(){   
    
            $.ajax({
                type:"GET",
                url: `${local}/todos`,
                headers:{token: token},
                success: (res)=>{
                    $("#listTodo").empty()
                    res.forEach(element => {
                        $("#listTodo").append(
                            `<tr id="d${element.id}">
                            <td>${element.id}</td>
                             <td id="f1">${element.title}</td>
                             <td id="l1">${element.description}</td>
                             <td id="m1">${element.status}</td>
                             <td id="c1">${element.due_date}</td>
                             <td><button type="button" data-toggle="modal"id="up${element.id}" data-url="${local}/todos/${element.id}" data-target="#edit"   value="${element.id}" class="update btn btn-warning btn-sm" data-backdrop="false" ><span class="glyphicon upModel glyphicon-pencil"></span></button></td>
                             <td><button type="button" data-toggle="modal"id="del${element.id}" data-target="#delete" data-url="${local}/todos/${element.id}" value="${element.id}" class="delete btn btn-danger btn-sm" data-backdrop="false"><span class="glyphicon delModel glyphicon-trash"></span></button></td>
                            </tr>`
                             )
                            })
                }
            })

                }
                    

if (token) {
    registerPage.hide()
    loginPage.hide()
    tableList.show()
    $("#logout").show()
    $("#addBtn").show()
    
    getList();
    $("#logout").on("click", function(e){
        console.log(localStorage)
        localStorage.removeItem("token")
        console.log(localStorage);
        tableList.hide()
        registerPage.hide()
        loginPage.show()
        $("#logout").hide()
        $("#addBtn").hide()
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }


$("#addModal").on("click", function(e) {
    $.ajax({
        method: "POST",
        url: `${local}/todos/`,
        headers: {token:token},
        data: {
            title: $("#addTitle").val(),
            description: $("#addDescription").val(),
            status: $("#addStatus").val(),
            due_date: $('#addDue_date').val()
        },
        success: function() {
            getList()
        }    
    })
})

$(document).on("click", "[id^=up]", function(e){
    e.preventDefault()
    var url = $(this).data("url")
    $.ajax({
        type:"GET",
        url:`${url}`,
        headers: {token:token},
        success: function(result){
            console.log(result.title)
            $("#updateTitle").val(result.title);
            $("#updateDescription").val(result.description);
            $("#updateStatus").val(result.status)
            $("#updateDue_date").val(result.due_date)

        }
    })
    $("#up").on('click', function(){
        
        $.ajax({
            type: "PUT",
            url: `${url}`,
            headers:{token : token},
            data: {
                title: $("#updateTitle").val(),
                description: $("#updateDescription").val(),
                status: $("#updateStatus").val(),
                due_date: $('#updateDue_date').val()
            },
        })
        .done(res =>{
            getList()
            console.log("Update Berhasil!!")
            $(`#editModal`).hide()
        })
        .fail(err => {
            // alert("gg");
        })
    });
})

$(document).on('click', "[id^=del]", function(e){
    e.preventDefault()
    $("#modal-delete").show()
    let delUrl = $(this).data('url')
    $(document).on("click","#del-modal",function(e) {
        // console.log(delUrl, "dkfhsofsk[[aspcp,[");
        e.preventDefault()
        $.ajax({
            type: "DELETE",
            headers: {token : token},
            url: `${delUrl}`,
            success: function(result) {
                console.log(result)
                  getList();
                
            }
        })   
    
    })
})



$("#register-page a").on("click", (e)=>{
    e.preventDefault()
    registerPage.hide()
    tableList.hide()
    loginPage.show()
})

$("#login-page a").on("click", (e)=>{
    e.preventDefault()
    loginPage.hide()
    tableList.hide()
    registerPage.show()
})

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // console.log(profile, "lontongggg sayurrr");
    
    if (profile) {
        $.ajax({
            method:"GET",
            url:"http://localhost:3000/data",
            success:(result)=>{
                console.log(result, "MASUKKKKK??");
                result.forEach(data =>{
                    if (data.email==profile.getEmail()) {
                        login()
                    } else if (data.email!==profile.getEmail()){
                        $.ajax({
                            method:"POST",
                            url:"http://localhost:3000/register",
                            data:{
                                email: profile.getEmail(),
                                username: "apaaja",
                                password: "123"
                            },
                            success: (res)=>{
                               login()
                            }
                        })
                    }

                })
            }
        })
    }
  }  