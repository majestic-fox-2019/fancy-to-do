const Project = require('../controllers/projectController');
const router = require('express').Router();

router.post('/', Project.create)
router.get('/', Project.readAll)
router.get('/:id', Project.readOne)
router.put('/:id', Project.update)
router.delete('/:id', Project.delete)

module.exports = router