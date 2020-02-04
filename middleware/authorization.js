const { Todo } = require('../models')


module.exports = (req,res,next) =>{
  Todo
  .findOne({
    where: {
      id:req.params.id
    }
  })
  .then(response =>{

    if(response.UserId == req.user.id){
      next()
    }else{
      let objErr={}
      objErr.statusCode = 401
      objErr.data = 'Unauthorized'
      
      throw  objErr
    }
  })
  .catch(err =>{
    next(err)
  })
}