"use strict"

const { User } = require("../models")
const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        const { email, password, fullname, picture } = req.body
        if (password.length < 6) {
            next({
                status: 400,
                msg: "password length min character 6"
            })
        }
        User.create({
            email,
            password,
            fullname,
            picture
        })
            .then((user) => {
                const token = createToken(user)
                res.status(201).json({ user, token })
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
                        res.status(201).json({ user, token })
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