const router = require('express').Router();
const todo = require('./todoRoute');
const user  = require('./userRoutes');
const project  = require('./projectRoute');
const authorizer = require('../middlewares/authorizer');
const UserProject = require('./userprojectRoute');

router.use('/user',user )
router.use(authorizer)
router.use('/todo',todo )
router.use('/project',project)
router.use('/userproject', UserProject)

module.exports = router