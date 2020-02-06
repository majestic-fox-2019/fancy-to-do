'use strict';

const { User } = require('../models');
const { generateToken } = require('../middlewares/jwt');
const { compareHash } = require('../helpers/bcrypt');

class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body;
        User.create({
            name,
            email,
            password,
        })
        .then(userCreated => {
            const token = generateToken( userCreated.dataValues )
            res.status(201).json({
                id: userCreated.id,
                name: userCreated.name,
                email: userCreated.email,
                token: token
            });
        })
        .catch(err => {
            console.log('next user login ', err.name)
            next(err);
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(!user) {
                next({ status: 400, message: 'Email/Password wrong'});
            } else {
                if(compareHash(password, user.password)) {
                    const token = generateToken( user.dataValues );
                    res.status(200).json({
                        id: user.dataValues.id,
                        name: user.dataValues.name,
                        email: user.dataValues.email,
                        token: token,
                    })
                } else {
                    next({ status: 400, message: 'Email/Password wrong' });
                }
            }
        })
        .catch(next)
    }

    static getUser(req, res, next) {
        res.status(200).json(req.userLoggedIn)
    }
}

module.exports = UserController;