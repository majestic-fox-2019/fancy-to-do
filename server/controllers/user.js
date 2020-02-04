"use strict"

const { User } = require("../models")
const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        const { email, password, fullname, picture } = req.body
        User.create({
            email,
            password,
            fullname,
            picture
        })
            .then((user) => {
                const token = createToken(user)
                req.status(201).json({ user, token })
            }).catch(next);
    }
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then((user) => {
                if (user) {
                    const pwd = checkPassword(password, user.password)
                    if (pwd) {
                        const token = createToken(user)
                        req.status(201).json({ user, token })
                    } else {
                        next({
                            status: 400,
                            msg: "email/password wrong"
                        })
                    }
                } else {
                    next({
                        status: 400,
                        msg: "email/password wrong"
                    })
                }
            }).catch(next);
    }
}

module.exports = UserController