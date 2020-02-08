"use strict"

const { User, Todo, Project, userProject } = require("../models")
const jwt = require('../helper/jwt')

function authenticate(req, res, next) {
    try {
        const token = jwt.verifyPassword(req.headers.token)
        User.findByPk(token.id)
            .then(data => {
                if (!data) {
                    next({ name: 'not found', message: 'user not found' })
                } else {
                    req.userId = token.id
                    next()
                }
            })
            .catch(err => {
                next(err)
            })
    }
    catch (err) {
        next(err)
    }
}

function authorize(req, res, next) {
    try {
        let test = []
        Todo.findByPk(req.params.id)
            .then(user => {
                if (user) {
                    if (user.dataValues.ProjectId) {
                        return userProject.findOne({ where: { ProjectId: user.dataValues.ProjectId, UserId: req.userId } })
                    } else {
                        test.push(1)
                        if (user.UserId !== req.userId) {
                            next({
                                name: 'not authorize',
                                message: 'you are not authorize'
                            })
                        } else {
                            next()
                        }
                    }
                } else {
                    next({
                        name: 'not found',
                        message: 'todo not found'
                    })
                }
                console.log(req.params.id)
            })
            .then(data => {
                if (test.length > 0) {
                    return
                } else {
                    if (data) {
                        next()
                    } else {
                        console.log('test')
                        next({
                            name: 'not authorize',
                            message: 'you are not authorize'
                        })
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
    catch (err) {
        next(err)
    }
}

function authorizeProject(req, res, next) {
    try {
        Project.findByPk(req.params.id, { include: [User] })
            .then(user => {
                if (user) {
                    let isUser = []
                    user.Users.forEach(element => {
                        if (element.dataValues.id === req.userId) {
                            isUser.push(1)
                        }
                    });
                    if (isUser.length === 0) {
                        next({
                            name: 'not authorize',
                            message: 'you are not authorize'
                        })
                    } else {
                        next()
                    }
                } else {
                    next({
                        name: 'not found',
                        message: 'project not found'
                    })
                }

            })
            .catch(err => {
                next(err)
            })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    authenticate,
    authorize,
    authorizeProject
}