const user = require('express').Router()
const controller = require('../controllers/user')

user.post('/register', controller.register)
user.post('/login', controller.login)
user.post('/google-signin', controller.googleSignIn)
user.use(require('../middleware/authToken'))
user.get('/user/todos', controller.listTodo)

module.exports = user