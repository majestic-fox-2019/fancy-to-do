
$(document).ready(function () {
    checkLogin()
    $("#goRegister").on("click", function (e) {
        e.preventDefault()
        $("#loginPage").fadeOut('slow')
        $("#registerPage").fadeIn('slow')
    })

    $("#goLogin").on("click", function (e) {
        e.preventDefault()
        $("#registerPage").fadeOut('slow')
        $("#loginPage").fadeIn('slow')
    })

    $("#loginForm").on("submit", function (e) {
        e.preventDefault()
        const email = $("#email").val()
        const password = $("#password").val()
        fromLogin(email, password)
    })

    $("#registerForm").on("submit", function (e) {
        e.preventDefault()
        const email = $("#emailRegister").val()
        const password = $("#passwordRegister").val()
        const fullname = $("#fullnameRegister").val()
        fromRegister(email, password, fullname)
    })

    $("#myProject").on("click", function (e) {
        e.preventDefault()
        $('#completed').empty()
        $('#todo').empty()
        $("#colProject").fadeIn('slow')
        $("#myTodoProject").fadeIn('slow')
        $("#myTodoPrivate").fadeOut('slow')
        allProject()
    })

    $("#myTodo").on("click", function (e) {
        e.preventDefault()
        $("#colProject").fadeOut('slow')
        $("#myTodoPrivate").fadeIn('slow')
        $("#myTodoProject").fadeOut('slow')
        $('#todoProject').empty()
        $('#completeTodoProject').empty()
        $('#member').empty()
    })

    $("#addProject").on("submit", function (e) {
        e.preventDefault()
        const nameProject = $("#nameProject").val()
        addedProject(nameProject)
    })

    $("#getingMember").on("click", function (e) {
        e.preventDefault()
        $("#colProject").fadeOut('slow')
    })

    $("#addTodoProject").submit(function (e) {
        e.preventDefault()
        const title = $('#titleTodoProject').val()
        const description = $('#descriptionTodoProject').val()
        const dueDate = $('#dueDateTodoProject').val()
        const projectIdTodo = $('#projectIdTodo').val()
        createTodoProject(projectIdTodo, title, dueDate, description)
    })
})

function onSignIn(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token
    $.ajax({
        method: "POST",
        url: `${baseUrl}/users/login/google`,
        data: { idToken }
    })
        .done((response) => {
            localStorage.setItem('token', response.token)
            localStorage.setItem('id', response.user.id)
            localStorage.setItem('email', response.user.email)
            localStorage.setItem('fullname', response.user.fullname)
            localStorage.setItem('picture', response.user.picture)
            checkLogin()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `welcome ${response.user.fullname}`,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON.message
            })
        })
}

function fromLogin(email, password) {
    $.ajax({
        method: "POST",
        url: `${baseUrl}/users/login`,
        data: {
            email,
            password
        }
    })
        .done((response) => {
            const { id, fullname, email } = response.user
            localStorage.setItem('token', response.token)
            localStorage.setItem('id', id)
            localStorage.setItem('fullname', fullname)
            localStorage.setItem('email', email)
            checkLogin()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `welcome ${response.user.fullname}`,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON
            })
        })
}

function fromRegister(email, password, fullname) {
    $.ajax({
        method: "POST",
        url: `${baseUrl}/users/register`,
        data: {
            fullname,
            email,
            password
        }
    })
        .done((response) => {
            const { token, id, fullname, email } = response
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
            localStorage.setItem('fullname', fullname)
            localStorage.setItem('email', email)
            checkLogin()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `welcome ${response.user.fullname}`,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Status : ' + err.status,
                text: err.responseJSON
            })
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear()
        checkLogin()
    });
}

function checkLogin() {
    if (localStorage.getItem("token") == null) {
        $("#loginRegister").show()
        $("#loginPage").show()
        $("#navbarApp").hide()
        $("#mainPage").hide()
        $("#myTodoPrivate").hide()
        $("#myTodoProject").hide()
        $("#tampilanDalem").hide()
        $('#completed').empty()
        $('#todo').empty()
        $('#shipcanvas').fadeIn('slow')

    } else {
        $("#loginRegister").hide()
        $("#navbarApp").fadeIn('slow')
        $('#mainPage').show()
        $('#tampilanDalem').fadeIn('slow')
        $('#shipcanvas').fadeOut('slow')
    }
}

(function myAnimate() {
    var myCanvas = document.createElement('canvas');
    var canvas = document.querySelector('body').appendChild(myCanvas);

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.id = 'shipcanvas';

    var stage = new createjs.Stage(canvas);
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    ss = new createjs.SpriteSheet({
        animations: {
            fly: [0, 14, "fly", 4]
        },
        images: ["http://planetoftheweb.com/_/images/powship_sprites.png"],
        frames: {
            regX: 158,
            regY: 113,
            width: 316,
            height: 226
        }
    });

    var ship = new createjs.BitmapAnimation(ss);
    ship.gotoAndPlay("fly");
    stage.addChild(ship);
    createjs.Ticker.setFPS(60);
    ship.x = centerX;
    ship.y = 65;
    ship.scaleX = .4;
    ship.scaleY = .4;


    createjs.Ticker.addListener(function () {
        var difX = stage.mouseX - ship.x;
        var difY = stage.mouseY - ship.y;

        ship.x += difX / 100;
        ship.y += difY / 100;

        stage.update();
    });
})();

FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;
        console.log(accessToken);
    }
});