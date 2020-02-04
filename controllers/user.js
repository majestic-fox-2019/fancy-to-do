const { User, Todo } = require('../models/index')
const createError = require('http-errors')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/helper')

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user != null) {
                throw createError(409, 'Email already registered')
            }
            return User.create({ email, password })
        }).then(result => {
            res.status(201).json(result)
        }).catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                if (comparePassword(password, user.password)) {
                    const payload = {
                        id: user.id
                    }
                    const token = generateToken(payload)
                    res.status(200).json({ token: token })
                } else {
                    throw createError(401, 'Invalid username or password')
                }
            } else {
                throw createError(404, 'User not found')
            }
        }).catch(err => {
            next(err)
        })
    }

    static listTodo(req, res, next) {
        User.findOne({
            include: Todo,
            where: {
                id: req.loggedUserId
            }
        }).then(todos => {
            res.json(todos.Todos)
        }).catch(err => {
            next(err)
        })
    }
}

module.exports = UserController