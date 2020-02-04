'use strict';

const { verifyToken } = require('./jwt');
const { User, Todo } = require('../models');

function authentication(req, res, next) {
    if(req.headers.hasOwnProperty('token')) {
        try {
            req.userLoggedIn = verifyToken(req.headers.token);
            User.findByPk(req.userLoggedIn.id)
            .then(user => {
                if(user) {
                    next();
                } else {
                    next({ status: 400, message: 'Invalid access' });
                }
            })
            .catch(next)
        } catch(err) {
            next(err);
        }
    } else {
        next({ status: 401, message: 'You must login first'});
    }
}

function authorization(req, res, next) {
    Todo.findOne({

    })
    .then()
    .catch(next)
}
module.exports = {
    authentication,
}