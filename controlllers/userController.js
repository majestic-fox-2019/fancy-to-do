const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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

                        let token = jwt.sign(result, process.env.secret_key)
                        res.status(200).json({accessToken: token})
                    } else {
                        throw {
                            statusCode: 404,
                            message: 'Incorrect Username or Password'
                        }
                    }
                    
                } else {
                    throw {
                        statusCode: 404,
                        message: 'Incorrect Username or Password'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static register(req, res, next){
        let { username, email, password } = req.body
        User
            .create({
                username,
                email,
                password
            })
            .then(user => { 
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController