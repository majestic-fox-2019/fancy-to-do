const endpoint = 'http://localhost:3000'

const templateTodo = (todo) => {
    const isExpired = new Date(todo.due_date).getTime() < new Date().getTime()
    return `<div style="border: solid 5px #fff; border-radius: 12px;background-color : ${isExpired ? '#ddd' : '#f0f0f0'};";>
    <div class="container">
    <h3 id="title-${todo.id}">${todo.title}</h3>
    <p id="desc-${todo.id}">${todo.description}</p>
    <p id="due-date-${todo.id}" data-date=${todo.due_date}>${new Date(todo.due_date).toLocaleDateString('en-GB')}</p>
    <p id="status-${todo.id}">Status : <span style="color : ${todo.status ? 'green' : 'red'} ;">${todo.status ? 'Already done' : 'Not done'}</span></p>
    <button class="button edit" data-id="${todo.id}" ${todo.status && 'disabled'}>Edit</button>
    <button class="button button__delete delete" data-id="${todo.id}">Delete</button>
    <div class="right-align"><button class="button button__accent done" data-id="${todo.id}" ${todo.status && 'disabled'} ${isExpired && 'disabled'}>Change Status</button></div>
    </div>
    </div>`
}

const templateCalendar = (holiday, id) => {
    const isExpired = new Date(holiday.date.iso) < new Date() ? true : false
    return `<div>
    <div class="container">
    <h3 id="name-holiday-${id}">${holiday.name}</h3>
    <p id="desc-holiday-${id}">${holiday.description}</p>
    <p id="date-holiday-${id}" data-date=${holiday.date.iso}>${new Date(holiday.date.iso).toLocaleDateString('en-GB')}</p>
    <div class="right-align"><button data-id=${id} class="button button__accent add_holiday" ${isExpired && 'disabled'}>Add Todo</button></div>
    </div>
    </div>
    <hr>`
}

// caching
var $landing_page = $('#landing_page')
var $login_page = $("#login_page")
var $login_form = $('#login_form')
var $user_page = $('#user_page')
var $register_page = $('#register_page')
var $register_form = $('#register_form')
var $register_link = $('#register_link')
var $login_link = $('#login_link')
var $navbar_menu = $('#navbar_menu');
var $form_add = $('#form_add_todo')
var $form_edit = $('#form_edit_todo')
var $list_todo = $('#list-todo')
var $my_todo = $('#my_todo')
var $holiday = $('#holiday')
var $holiday_page = $('#holiday_page')
var $my_todo_page = $('#my_todo_page')

if (localStorage.getItem('token')) {
    userloggedIn()
} else {
    userIsNotLoggedIn()
}

function userloggedIn() {
    $landing_page.slideUp(700, function () {
        $user_page.slideDown(700, function () {
            $user_page.show()
            $form_add.hide();
            $navbar_menu.show()
            $('#username').text(localStorage.email);
            $form_edit.hide();
            $holiday_page.hide()
            Request.getTodos()
            $('#add_form_holiday').hide();
        })
    })
}

function userIsNotLoggedIn() {
    $register_page.hide()
    $navbar_menu.hide()
    $user_page.slideUp(700, function () {
        $landing_page.slideDown(700, function () {
            $user_page.hide()
            $login_page.show()
            $landing_page.show()
        })
    })
}

$my_todo.on('click', function () {
    $holiday_page.slideUp(500, function () {
        $holiday_page.hide()
        $my_todo_page.slideDown(500, function () {
            Request.getTodos()
        })
    })
})

$holiday.on('click', function () {
    $my_todo_page.slideUp(500, function () {
        $my_todo_page.hide()
        $holiday_page.slideDown(500, function () {
            $holiday_page.show()
            $form_add.hide()
            Request.getHolidays()
        })
    })
})

$(document).on('submit', "#form_add_todo", function (e) {
    e.preventDefault()
    const value = {
        title: $('#title').val(),
        description: $('#description').val(),
        due_date: $('#due_date').val()
    }
    Request.add(value)
});

$(document).on('click', '.add_holiday', function (e) {
    const id = $(this).data('id')
    $('#title-add-holiday').val($(`#name-holiday-${id}`).text());
    $('#due_date-add-holiday').val($(`#date-holiday-${id}`).data('date'))
    $('#holiday-list').hide();
    $('#add_form_holiday').show();
})

$(document).on('submit', '#add_form_holiday', function () {
    const value = {
        title: $('#title-add-holiday').val(),
        description: $('#description-add-holiday').val(),
        due_date: $('#due_date-add-holiday').val()
    }
    Request.addHoliday(value)
})

$('#cancel-add').on('click', function () {
    $('#holiday-list').show();
    $('#add_form_holiday').hide();
});

$(document).on('click', ".edit", function (e) {
    e.preventDefault()
    Request.edit(this)
})

$(document).on('click', ".done", function (e) {
    e.preventDefault()
    Request.done(this)
})

$(document).on('click', ".delete", function (e) {
    e.preventDefault()
    Alert.confirmation(this)
})

$(document).on('click', '#register_link', function (e) {
    e.preventDefault()
    $login_page.fadeOut(500, function () {
        $login_page.hide()
        $register_page.fadeIn(500, function () {
            $register_page.show()
        })
    })
})

$(document).on('click', '#login_link', function (e) {
    e.preventDefault()
    $register_page.fadeOut(500, function () {
        $register_page.hide()
        $login_page.fadeIn(500, function () {
            $login_page.show()
        })
    })
})

$(document).on('submit', '#login_form', function (e) {
    e.preventDefault()
    Request.login()
})


$(document).on('submit', '#register_form', function (e) {
    e.preventDefault()
    Request.register()
})

$(document).on('click', '#logout', function (e) {
    e.preventDefault()
    Alert.confirmationExit()
});

let isShowFormAdd = false
$(document).on('click', "#add_form", function (e) {
    e.preventDefault()
    isShowFormAdd = !isShowFormAdd
    if (isShowFormAdd) {
        $list_todo.slideUp(500, function () {
            $list_todo.hide();
        });
        $('#add_form').val('cancel');
        $form_add.show();
    } else {
        $list_todo.slideDown(500, function () {
            $list_todo.show();
        });
        $('#add_form').val('add todo');
        $form_add.hide();
    }
})

$(document).on('click', '#cancel-edit', function (e) {
    e.preventDefault()
    $('#add_form').show();
    $form_edit.slideUp(500, function () {
        $form_edit.hide()
        $list_todo.slideDown(500, function () {
            $list_todo.show()
        })
    })
});