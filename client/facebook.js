// var baseUrl = "http://localhost:3000"
function statusChangeCallback(response) {

    // The response object is returned with a status field that lets the app 	know 		the current login status of the person.
    if (response.status === 'connected') {

        // console.log('Welcome!  Fetching your information.... ');
        swal({
            title: 'Hello from Facebook!',
            text: 'Welcome!  Fetching your information.... ',
            timer: 2000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                swal.showLoading()
                timerInterval = setInterval(() => {
                    const content = swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                            b.textContent = swal.getTimerLeft()
                        }
                    }
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            }
        })
        FB.api('/me', function (response) {
            // console.log(response, "<<<<<<<")
            let splitName = response.name.split(" ")
            let email = splitName[0].toLowerCase() + "facebook@mail.com"
            let username = splitName[0] + "facebook"
            // console.log(email, "<<email")
            $.ajax(`${baseUrl}/user/facebook`, {
                type: "POST",
                data: {
                    email,
                    username
                },
                success: function (hasilnya) {
                    localStorage.setItem("token", hasilnya.token)
                    localStorage.setItem("username", hasilnya.userFacebook.username)
                    localStorage.setItem("UserId", hasilnya.userFacebook.id)
                    $("#loginRegPage").hide()
                    $("#main").show()

                    $("#UsernameButton").text(function () {
                        return hasilnya.userFacebook.username
                    })
                    getMyTodos()
                },
                error: function (err) {
                    console.log(err, "error facebook")
                    swal("Oops", "Something went wrong", "error")
                }
            })
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        // document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
        // document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
    }

}
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '2830986740326677',
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.1' // use version 2.1
    });

    // Now that we've initialized the JavaScript SDK, we call FB.getLoginStatus(). 
    // This function gets the state of the person visiting this page.
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));