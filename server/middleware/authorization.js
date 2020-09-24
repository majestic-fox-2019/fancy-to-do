const { Todo } = require('../models')
const createError = require('http-errors')


module.exports = (req,res,next) =>{
  Todo
  .findOne({
    where: {
      id:req.params.id
    }
  })
  .then(response =>{
    if(response == null){
      throw createError(404," data not found ")
    }else if(response.UserId == req.user.id){
      next()
    }else{
      throw createError(403,'Unathorized')
    }

      // if(response.UserId == req.user.id){
      //   next()
      // } else{
      //   throw createError(404, "Data not found")
      // }
  })
  .catch(err =>{
    next(err)
  })
}