'use strict'

const { User } = require('../models')
const bcryptPass = require('../helpers/bcryptPass')
const verify = require('../helpers/verify')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
class userController {
    static register (req, res, next){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }
    static login (req, res, next){
        if(req.body.email === "" || req.body.password === ""){
            next ({code: 400, message:'please insert email and password'})
        } else {
            User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(result => {
                console.log(result)
                const user = result.dataValues
                if(result === 'null'){
                    console.log(result)
                    throw {code: 400, message:'email/password is wrong'}
                } else {
                    const compare = bcryptPass.compare(req.body.password, user.password)
                    if(!compare){
                        throw {code: 400, message:'email/password is wrong'}
                    } else {
                        const jwtToken = verify.generateToken(user.id)
                        res.status(200).json({
                            token: jwtToken,
                            id: user.id, 
                            name: user.name})
                    }
                }
            })
            .catch(next)
        }
    }
    static async googleLogin (req, res, next){
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            const user = {
                name: payload.name,
                email: payload.email,
                password: payload.sub
            }

            User.findOne({
                where: {
                    email: user.email
                }
            })
            .then(result => {
                if(!result) {
                    return User.create(user)
                } else {
                    return result
                }
            })
            .then(result => {
                    const jwtToken = verify.generateToken(result.id)
                    res.status(200).json({
                        token: jwtToken,
                        id: result.id, 
                        name: result.name
                    })
            })
        } catch (err) {
            next(err)
        }

    }
}

module.exports = userController