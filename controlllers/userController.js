const { User } = require('../models')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const helper = require('../helpers/helper')

const axios = require('axios')
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
}

module.exports = UserController