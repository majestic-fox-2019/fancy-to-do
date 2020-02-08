const router = require('express').Router()
const controller = require('../controllers/sendGrid')
const projectName = require('../middlewares/projectNameGetter')

router.post('/member', projectName, controller.memberInvited)

module.exports = router