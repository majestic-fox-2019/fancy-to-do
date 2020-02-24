const Project = require('../controllers/projectController');
const router = require('express').Router();
const db = require('../models');

const Auth = (req,res,next)=>{
    db.Project.findByPk(req.params.id, {
        include : [{
            model : db.User,
            attributes : ['email']
        }]
    })
    .then(response => {
        console.log(response)
        if(response){
            if(response.Users.some(user => user.email === req.user.email)){
                next()
            } else {
                next('unauthorized')
            }
        } else {
            next('todo-not-found')
        }
    })
}

const Owner = (req,res,next)=>{
    db.Project.findByPk(req.params.id, )
    .then(response => {
        if(response){
            if(response.AuthorId === req.user.id){
                next()
            } else {
                next('unauthorized')
            }
        } else {
            next('todo-not-found')
        }
    })
}

router.post('/', Project.create)
router.get('/', Project.readAll)
router.post('/:id', Auth, Owner, Project.toggleStatus)
router.get('/:id', Auth, Project.readOne)
router.put('/:id', Auth, Owner, Project.update)
router.delete('/:id', Auth, Owner, Project.delete)

module.exports = router