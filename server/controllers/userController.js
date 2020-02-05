const modelUser = require('../models').User
const matchPass = require("../helpers/matchPassword")
const generateToken = require("../helpers/generateToken")
const verifyTokenGoogle = require("../helpers/verifyTokenGoogle")
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

    static getUserById(req, res, next) {
        modelUser.findOne({ where: { id: req.params.id } })
            .then(usernyaFound => {
                if (usernyaFound) {
                    res.status(200).json(usernyaFound)
                } else {
                    next({ code: 404, message: "User not found" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static google(req, res, next) {
        // console.log(req.body, "<<<<<<<<<<<<<<<<<<<<ini req body")
        let email
        let username
        const tokenGoogle = req.body.id_token
        console.log(tokenGoogle, "<<<<<< ini token google!!!!!!!!!!!!!!!!!!!!!!!!")
        const payload = verifyTokenGoogle(tokenGoogle)
        payload.then(data => {
            email = data.email
            username = data.name
            return modelUser.findOne({ where: { email: email } })
        })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return modelUser.create({
                        username: username,
                        email: email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(userFromGoogle => {
                const token = generateToken({ id: userFromGoogle.id })
                req.headers.token = token

                res.status(200).json({ userFromGoogle, token })
            })
    }

    static facebook(req, res, next) {
        modelUser.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return modelUser.create({
                        email: req.body.email,
                        username: req.body.username,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(userFacebook => {
                let token = generateToken({ id: userFacebook.id })
                req.headers.token = token
                res.status(201).json({ userFacebook, token })
            })
            .catch(err => {
                next(err)
            })

    }
}

module.exports = ControlUser