'use strict';

const { User } = require('../models');
const { generateToken } = require('../middlewares/jwt');

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
                token: token
            });
        })
        .catch(next)
    }

    static login(req, res, next) {

    }
}

module.exports = UserController;