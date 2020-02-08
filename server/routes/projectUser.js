const route = require("express").Router()
const projectuser = require("../controllers/projectUsers")
const authentication = require("../middlewares/authentication")
const access = require("../middlewares/access")
route.use(authentication)
route.post('/',projectuser.create)
route.use(access.accessProject)
route.delete('/:id',projectuser.delete)

module.exports = route