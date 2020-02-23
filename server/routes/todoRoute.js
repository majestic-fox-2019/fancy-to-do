const Todo = require('../controllers/todoController');
const db = require('../models');


const router = require('express').Router();

const Auth = (req,res,next)=>{
    console.log('went over auth')
    db.Todo.findByPk(req.params.id, {
        include : [{
            model : db.User,
            attributes : ['email']
        }]
    })
    .then(response => {
        if(response){
            if(response.User.email === req.user.email){
                next()
            } else {
                next('unauthorized')
            }
        } else {
            next('todo-not-found')
        }
    })
}

router.post('/', Todo.create)
router.get('/', Todo.read)
router.get('/:id',Auth, Todo.readOne)
router.put('/:id',Auth, Todo.update)
router.put('/status/:id',Auth, Todo.toggleStatus)
router.delete('/:id',Auth, Todo.delete)

module.exports = router