const { Todo } = require('../models')
const createError = require('http-errors')

function authorization(req, res, next){
    Todo
        .findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id
            }
        })
        .then(found => {
            if(found){
                next()
            } else {
                next(createError(404, 'Error! Data not found'))
            }
        })
        .catch(next)
}

module.exports = authorization