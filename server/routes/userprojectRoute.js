const router = require('express').Router();
const UserProject = require('../controllers/userprojectController');

router.get('/', UserProject.readAll)
router.get('/:id', UserProject.readOne)
router.post('/', UserProject.create)
router.post('/invite/:ProjectId', UserProject.invite)
router.delete('/uninvite/:ProjectId', UserProject.uninvite)
router.put('/:id', UserProject.update)
router.delete('/:id', UserProject.delete)

module.exports = router