class User {

    static loginHandler($email, $password) {
        const objValue = {
            email: $email,
            password: $password
        }

        $.ajax({
            url: `${base_url}/users/login`,
            method: 'POST',
            data: objValue,
            beforeSend: () => {
                $buttonLogin.text('Loading...')
            },
            success: (result) => {
                $alertInfo.show()
                $alertInfo.find('.alert').text(`User ${result.name} sucessfully login!`)
                $todoUser.html(`<i class="fa fa-file-text-o" aria-hidden="true"></i> &nbsp;<b>${result.name}</b> To-do`)
                localStorage.token = result.token
                localStorage.name = result.name
                $mainPage.show()
                $loginRegisterPage.hide()
                Todo.getTodo()
                clearField($formLogin)

                setTimeout(() => {
                    $alertInfo.show().fadeOut(1000)
                }, 2000);

            },
            error: (xhr, status) => {
                const err = JSON.parse(xhr.responseText)
                $errorLogin.show()
                $errorLogin.text(err.message.error)
            },
            complete: () => {
                $buttonLogin.text('Login')
            }
        })
    }

    static loginByGoogle(id_token) {
        $.ajax({
            method: 'post',
            url: `${base_url}/users/google/login`,
            data: {
                token: id_token
            }
        })
            .done(result => {
                $alertInfo.show()
                $alertInfo.find('.alert').text(`User ${result.name} sucessfully login!`)
                $todoUser.html(`<i class="fa fa-file-text-o" aria-hidden="true"></i> <b>${result.name}</b> To-do`)
                localStorage.token = result.token
                localStorage.name = result.name
                $mainPage.show()
                $loginRegisterPage.hide()
                Todo.getTodo()
                setTimeout(() => {
                    $alertInfo.show().fadeOut(1000)
                }, 2000);
            })
            .fail(err => {
                console.log(err)
            })
    }

    static logoutHandler() {
        this.googleSignOut()
        localStorage.clear()
        $mainPage.hide()
        $loginRegisterPage.show()
        $alertLoginRegister.show()
        $alertLoginRegister.find('.alert').text('User sucessfully signed out!')
        setTimeout(() => {
            $alertLoginRegister.hide().fadeOut(1000)
        }, 2000);
    }

    static googleSignOut() {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    static registerHandler($name, $email, $password) {
        const objValue = {
            name: $name,
            email: $email,
            password: $password
        }

        $.ajax({
            headers: {
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
            url: `${base_url}/users/register`,
            method: 'POST',
            data: objValue,
            beforeSend: () => {
                $buttonRegister.text('Loading...')
            },
            success: (result) => {
                $alertLoginRegister.show()
                $alertLoginRegister.find('.alert').text(`User ${result.name} sucessfully register!`)
                localStorage.token = result.token
                localStorage.name = result.name
                clearField($formRegister)

                setTimeout(() => {
                    $alertLoginRegister.show().fadeOut(1000)
                }, 2000);

            },
            error: (xhr, status) => {
                const err = JSON.parse(xhr.responseText)
                for (let key in err.message) {
                    $(`#${key}_register`).addClass('is-invalid')
                    $(`.error_${key}`).text(err.message[key])
                }
            },
            complete: () => {
                $buttonRegister.text('Login')
            }
        })
    }

}