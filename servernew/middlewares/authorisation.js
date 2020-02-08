const Todo = require('../models').Todo
const User = require('../models').User
module.exports = function(req, res, next){
  console.log("masukkkkkk", req.params)
let stringId = req.user.id.toString()
  Todo.findOne({where:{id:req.params.id}})
  .then(todo=> {
    if(todo.UserId == stringId){
      next()
    } else {
      next({code:401, message:"you are not allowed to do this task"})
    }
  })
  .catch(err => {

      next({code:401, message:"invalid user"})
  })
}