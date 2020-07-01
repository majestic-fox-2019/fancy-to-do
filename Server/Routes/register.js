const express = require('express')
const router = express.Router()
const sessionController = require('../Controller/sessionController')

router.post('/',sessionController.Register)

module.exports = router