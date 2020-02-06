const BASE_URL = 'http://localhost:3000'
let projectId = null
let editId = null
let allTodos = []
let myProjects = []
let expired = []

function closeHome() {
  $('#login-btn').hide()
  $('#logout-btn').show()
  $('#homepage').hide()
  $('#mainpage').show()
}

function showHome() {
  $('#login-btn').show()
  $('#logout-btn').hide()
  $('#homepage').show()
  $('#mainpage').hide()
}

function showAddForm() {
  $('#add-todo').show()
  $('#add-title').show()
  $('#edit-title').hide()
  $('#edit-btn').hide()
  $('#name').val('')
  $('#description').val('')
  $('#due_date').val('')
}

function showEditForm() {
  $('#add-todo').hide()
  $('#add-title').hide()
  $('#edit-title').show()
  $('#edit-btn').show()
}
