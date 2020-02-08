const router = require('express').Router()
const controller = require('../controllers/userController')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/', controller.register)

router.post('/login', controller.login)

router.post('/googleSign', controller.gSign)

module.exports = router