class Request {
    static login() {
        const loginValue = {
            email: $('#email').val(),
            password: $('#password').val()
        }
        $.ajax({
            type: "post",
            url: `${endpoint}/login`,
            data: loginValue,
        }).done(response => {
            localStorage.setItem('token', response.token)
            localStorage.setItem('email', response.email)
            userloggedIn()
        }).fail(err => {
            Request.createError(err)
        })
    }

    static register() {
        const value = {
            email: $('#reg-email').val(),
            password: $('#reg-password').val()
        }
        $.ajax({
            type: "post",
            url: `${endpoint}/register`,
            data: value,
        }).done(response => {
            $register_page.fadeOut(500, function () {
                $register_page.hide()
                $login_page.fadeIn(500)
                Alert.notification("Successfully registered account", "success")
            })
        }).fail(err => {
            Request.createError(err)
        })
    }


    static createError(err) {
        err = (err.responseJSON)
        if (err !== undefined) {
            if (err.message instanceof Array) {
                Alert.notification(err.message.join('\n'), "warning")
            } else {
                Alert.notification(err.message, "warning")
            }
        } else {
            Alert.notification('Server is not responding', "warning")
        }
    }

    static getTodos() {
        $.ajax({
            type: "GET",
            url: `${endpoint}/todos`,
            headers: {
                token: localStorage.getItem('token')
            },
            error: (err) => {
                $list_todo.empty();
                const noData = `<h4 class="center" id="nodata">No data</h2>`
                $list_todo.append(noData);
            },
            success: (response) => {
                $list_todo.empty();
                response.forEach(todo => {
                    $list_todo.append(templateTodo(todo));
                })
                $list_todo.show();
                $('#add_form').val('add todo');
            }
        })
    }

    static getHolidays() {
        $.ajax({
            type: "GET",
            url: `${endpoint}/holiday`,
            error: (err) => {
                Request.createError(err)
            },
            success: (response) => {
                $('#holiday-list').empty();
                response.response.holidays.forEach((calendar, i) => {
                    $('#holiday-list').append(templateCalendar(calendar, i));
                });
            }
        })
    }

    static add(value) {
        $.ajax({
            type: "post",
            url: `${endpoint}/todos`,
            data: value,
            headers: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                $('#title').val('')
                $('#description').val('')
                $('#due_date').val('')
                $form_add.hide();
                Request.getTodos()
                Alert.notification("Successfully added data", "success")
            },
            error: (err) => {
                Request.createError(err)
            }
        });
    }

    static addHoliday(value) {
        $.ajax({
            type: "post",
            url: `${endpoint}/todos`,
            data: value,
            headers: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                $('#title-add-holiday').val('')
                $('#description-add-holiday').val('')
                $('#due_date-add-holiday').val('')
                Alert.notification("Successfully added data", "success")
                $('#holiday-list').show();
                $('#add_form_holiday').hide();
            },
            error: (err) => {
                Request.createError(err)
            }
        });
    }

    static edit(params) {
        $('#add_form').hide();
        let id = $(params).data('id')
        $('#edit-title').val($(`#title-${id}`).text());
        $('#edit-description').val($(`#desc-${id}`).text());
        $('#edit-due_date').val($(`#due-date-${id}`).text());
        $list_todo.slideUp(500, function () {
            $list_todo.hide()
            $form_edit.slideDown(500, function () {
                $form_edit.show()
            });
        });
        $form_edit.on('submit', function (e) {
            e.preventDefault()
            Alert.confirmationUpdate(id)
        });
    }

    static done(params) {
        let id = $(params).data('id')
        const value = {
            id,
            title: $(`#title-${id}`).text(),
            description: $(`#desc-${id}`).text(),
            due_date: $(`#due-date-${id}`).data('date'),
            status: true
        }
        $.ajax({
            type: "put",
            url: `${endpoint}/todos/${id}`,
            data: value,
            headers: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                Alert.notification("Successfully updated status", "success")
                Request.getTodos()
            },
            error: function (err) {
                Request.createError(err)
            }
        });
    }

    static delete(params) {
        let id = $(params).data('id')
        $.ajax({
            type: "delete",
            url: `${endpoint}/todos/${id}`,
            headers: {
                token: localStorage.getItem('token')
            },
            success: function (response) {
                Alert.notification("Successfully deleted data", "success")
                Request.getTodos()
            },
            error: function (err) {
                Request.createError(err)
            }
        });
    }
}