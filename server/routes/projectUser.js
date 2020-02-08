const route = require("express").Router()
const projectuser = require("../controllers/projectUsers")
const authentication = require("../middlewares/authentication")
route.use(authentication)
route.post('/',projectuser.create)
route.delete('/:id',projectuser.delete)

module.exports = route