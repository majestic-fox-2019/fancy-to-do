const modelUser = require('../models').User
const matchPass = require("../helpers/matchPassword")
const generateToken = require("../helpers/generateToken")
class ControlUser {
    static register(req, res, next) {
        modelUser.findOne({ where: { email: req.body.email } })
            .then(userEmailFound => {
                if (userEmailFound) {
                    // next({ code: 400, message: "email already registered" })
                    next({ code: 400, message: "email already registered" })
                } else {
                    let { username, email, password } = req.body
                    return modelUser.create({
                        username,
                        email,
                        password
                    })
                }
            })
            .then(userRegistered => {
                let token = generateToken({ id: userRegistered.id })
                req.headers.token = token
                res.status(201).json({ userRegistered, token })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        modelUser.findOne({ where: { email: req.body.email } })
            .then(userFound => {
                if (userFound) {
                    const cocokPass = matchPass(req.body.password, userFound.password)
                    if (cocokPass) {
                        let token = generateToken({ id: userFound.id })
                        req.headers.token = token
                        res.status(201).json({ userFound, token })
                    } else {
                        next({ code: 400, message: "wrong password or email" })
                    }
                } else {
                    next({ code: 400, message: "wrong password or email" })
                }
            })
            .catch(err => {

                next(err)
            })

    }
}

module.exports = ControlUser