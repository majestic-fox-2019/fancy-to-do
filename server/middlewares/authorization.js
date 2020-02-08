const {Todo} = require("../models")
const createError = require('http-errors')
function authorization(req,res,next){
  const id = req.params.id
  Todo
    .findOne({
      where : {
        id,
        UserId: req.user.id
      }
    })
    .then(todo => {
      if (todo){
        next()
      }else{
        throw createError(401,"Unauthorized")
      }
    })
    .catch(next)
}



module.exports = authorization 