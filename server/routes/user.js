const router = require('express').Router()
const UserController = require('../controllers/user')

router.get('/audio', UserController.audiodbAPI)
router.get('/province', UserController.provinsiAPI)
router.get('/zodiak', UserController.zodiakAPI)

module.exports = router