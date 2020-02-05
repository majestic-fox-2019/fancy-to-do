const { User } = require('../models')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const helper = require('../helpers/helper')
const axios = require('axios')

const { google } = require('googleapis')

const client_id = "105182697848-ecaopde8hjl2909vqrladq076ieu7h7r.apps.googleusercontent.com"
const client_secret = "-uHFPDvKP3sN1JWFNV9ibw2j"
const redirect_uri = "http://localhost:3000/google/redirect"

const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
)

const mailboxValidator = axios.create({
    baseURL: 'https://api.mailboxvalidator.com/v1/validation/single?key=ZLDJ9PTKF83YSRQUUJW9&',
});

class UserController {
    static login(req, res, next){
        let result
        User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if(user){
                    if(bcrypt.compareSync(req.body.password, user.password)){
                        result = {
                            id: user.id,
                            email: user.email,
                        }
                        let token = helper.generate(result)
                        res.status(200).json({ accessToken: token })
                    } else {
                        next(createError(404, 'Incorrect Username or Password'))
                    }
                } else {
                    next(createError(404, 'Incorrect Username or Password'))
                }
            })
            .catch(next)
    }

    static register(req, res, next){
        let { username, email, password } = req.body

        mailboxValidator
            .get(`&email=${email}`)
            .then(user => {
                if(user.data.is_verified == 'True'){
                    return User.create({
                        username,
                        email,
                        password
                    })
                } else {
                    throw createError(400, 'Email does not exist or not verified')
                }
            })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static googleLogin(req, res, next){
        console.log(req.payload)
        User
            .findOne({
                where: {
                    email: req.payload.email
                }
            })
            .then(user => {
                if(!user){
                    return User.create({
                        username: req.payload.name,
                        email: req.payload.email,
                        password: process.env.PASSWORD_DEFAULT
                    })
                } else {
                    return user
                }
            })
            .then(user => {
                let payload = {
                    id: user.id,
                    email: user.email
                }
                // console.log(user.id)
                let token = helper.generate(payload)
                res.status(200).json(token)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    // static googleSignIn(req, res, next){
    //     const authorizeUrl = oAuth2Client.generateAuthUrl({
    //             access_type: 'offline',
    //             scope: 
    //             [
    //                 'https://www.googleapis.com/auth/gmail.readonly',
    //                 'https://www.googleapis.com/auth/calendar',

    //             ]
    //     });

    //     res.status(400).json(authorizeUrl)
    // }
}


module.exports = UserController