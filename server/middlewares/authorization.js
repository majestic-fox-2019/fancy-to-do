'use strict'

const { Todo } = require('../models')

module.exports = function(req, res, next) {
    Todo.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        if(!result) throw ({code: 404, message: "data not found"})

        if(result.UserId !== req.id) throw ({code: 401, message: "Unauthorized"})

        next()
    })
}