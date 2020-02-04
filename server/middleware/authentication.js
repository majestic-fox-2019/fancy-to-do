"use strict"

const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

function authentication(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        try {
            const decoded = verifyToken(req.headers.token)
            User.findOne({
                where: {
                    id: decoded.id
                }
            })
                .then((user) => {
                    req.user = {
                        id: user.id,
                        email: user.email,
                        password: user.password,
                        username: user.username,
                    }
                    next()
                }).catch((err) => {
                    next(err)
                });
        } catch{
            next({
                status: 400,
                message: "Not found token"
            })
        }
    } else {
        next({
            status: 403,
            message: "You are not login"
        })
    }
}

module.exports = authentication