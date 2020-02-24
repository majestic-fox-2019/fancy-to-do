const route = require('express').Router()
const todo = require('./todo')
const user = require('./user')
const { getHolidays } = require('../helper/helper')

route.get('/holiday', (req, res, next) => {
    getHolidays().then(result => {
        res.status(200).json(result.data)
    }).catch(err => {
        next(err)
    })
})
route.use('/todos', todo)
route.use('/', user)


module.exports = route