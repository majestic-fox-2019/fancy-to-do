const express = require('express')
const router = express.Router()
const sessionController = require('../Controller/sessionController')

router.post('/',sessionController.Login)

module.exports = router