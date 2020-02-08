'use strict';

const { User } = require('../models');
const { generateToken } = require('../middlewares/jwt');
const { compareHash } = require('../helpers/bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_TOKEN);

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

    static googlesignin(req, res, next) {
        let email = null;
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_TOKEN
        })
        .then(ticket => {
            email = ticket.payload.email;
            return User.findOne({
                where: {
                    email
                }
            })    
        })
        .then(user => {
            if(user) {
                return user;
            } else {
                return User.create({
                    name: email,
                    email: email,
                    password: 'default'
                });
            }
        })
        .then(user => {
            const token = generateToken(user.dataValues);
            res.status(200).json({ 
                email: user.dataValues.email,
                token: token,
            });
        })
        .catch(next);
    }
}

module.exports = UserController;