const project = require('express').Router()
const projectController = require('../controllers/projectController')
const authentication = require('../middleware/authentication')

project.use(authentication)
project.get('/',projectController.list)
project.get('/:id',projectController.find)
project.post('/',projectController.create)
project.post('/addMember',projectController.addMember)



module.exports = project