const { User } = require('../models')
const jwt = require('jsonwebtoken')
const comparePassword = require('../helpers/comparePassword')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register(req, res, next) {
        User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        .then(createdUser => {
            // res.status(201).json(createdUser)
            let payload = {id: createdUser.id, email: createdUser.email}
            require('dotenv').config()
            let token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(201).json(token)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login(req, res, next){
        let payload
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(userData => {
            if(!userData){
                throw ({
                    statusCode: 404,
                    message: 'Invalid Email or Password'
                })
            } else {
                payload = {
                    id: userData.id,
                    email: userData.email
                }
                return comparePassword(req.body.password, userData.password)
            }
        })
        .then(compareResult => {
            if(!compareResult){
                throw ({
                    statusCode: 404,
                    message: 'Invalid Email or Password'
                })
            } else {
                require('dotenv').config()
                let token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(200).json(token)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static gSign(req, res, next) {
        // console.log(req.body.gToken);
        require('dotenv').config()
        const client = new OAuth2Client(process.env.GOOGLE_ID)
        let payload
        client.verifyIdToken({
            idToken: req.body.gToken,
            audience: process.env.GOOGLE_ID})
        .then(ticket => {
            payload = ticket.getPayload()
            // console.log(payload)
            return User.findOne({
                where: {
                    email: payload.email
                }
            })
        })
        .then(userData => {
            if(userData){
                // console.log(userData.id)
                let token = jwt.sign({id: userData.id, email: userData.email}, process.env.JWT_SECRET)
                res.status(200).json(token)
            } else {
                return User.create({
                    userName: payload.given_name,
                    email: payload.email,
                    password: process.env.DEFAULT_PASSWORD
                })
            }
        })
        .then(createdUser => {
            let token = jwt.sign({id: createdUser.id, email: createdUser.email}, process.env.JWT_SECRET)
            // console.log(token)
            res.status(200).json(token)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = UserController