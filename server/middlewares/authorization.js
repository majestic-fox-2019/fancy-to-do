const { Todo } = require('../models/index')
const createError = require('http-errors')


module.exports = (req, res, next) => {
    Todo
      .findOne({ where : {
        id : req.params.id
      } 
    })
    .then(response => {
      if(response != null){
        if(response.UserId === req.user.id){
          next()
        }else{
          throw createError(403, {message : { error : 'Forbidden'}})
        }
      }else{
        throw createError(404, { message : { error : `Todo doesn't exist`}})
      }
    })
    .catch(next)
    
}