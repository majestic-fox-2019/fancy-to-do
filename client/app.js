var todos = []
var projects = []
var todo = null
var $loginView = $('#loginView')
var $tableView = $('#tableView')
var $navView = $('#navView')
var urlBase = 'http://localhost:3000/'
function checkToken(){
  var $message = $('.message')
  $message.empty() 
  if(localStorage.getItem('token')){
    var $username = $('#username')
    $username.empty()
    $username.append(localStorage.getItem('email'))
    loadTodos()
    loadProjects()
    $loginView.hide()
    $navView.show()
    $tableView.show()
  }else{
    $loginView.show()
    $navView.hide()
    $tableView.hide()
  }
}



