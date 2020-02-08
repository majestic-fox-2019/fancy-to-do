//Base Url
const base_url = 'https://fancy-todo-server-arona.herokuapp.com'

//global
const $alertInfo = $('#alert-info')
const $alertLoginRegister = $('#alert-login-register')
const $btnLogout = $('#btnLogout')
const $modalAddTodo = $('#addTodo')
const $modalEditTodo = $('#editModal')
const $incomplete = $('.filter-status')

//Login variable
const $formLogin = $('#form-login')
const $errorLogin = $('.error-login')
const $buttonLogin = $('#btnLogin')
const $todoUser = $('#todo-user')
//End


//register variable
const $formRegister = $('#form-register')
const $buttonRegister = $('#btnRegister')

//table template
let $template = `<tr>
                        <td class="title"></td>
                        <td class="description"></td>
                        <td class="status"></td>
                        <td class="due_date"></td>
                        <td class="action"><a class="edit btn btn-info btn-sm text-light" id="updatetodo"><i class="fa fa-pencil" aria-hidden="true"></i></a> &nbsp;<a class="delete btn basic-background-color btn-sm text-light" id="deletetodo"><i class="fa fa-trash" aria-hidden="true"></i></a></td>
                 </tr>`

// table todo variable
const $container = $('.tableBody')
const $titles = $('#titles')

//add todo variable
const $formAddTodo = $('#add-todo')
const $title = $('#title')
const $description = $('#description')
const $due_date = $('#due_date')

//edit todo variable
const $formUpdateTodo = $('#edit-todo')
const $id = $('#edit_id')
const $title_edit = $('#title_edit')
const $description_edit = $('#description_edit')
const $status_edit = $('#status_edit')
const $due_date_edit = $('#due_date_edit')
