const {Todo} = require('../models')
module.exports = (req, res, next) => {
  Todo.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(result =>{
      console.log(result)
      console.log(result.UserId,req.user.id)
      if(result.UserId !== req.user.id){
        throw {
          status: 400,
          message: 'dont have access'
        }
      }
      next()
    })
    .catch(err=>{
      next(err)
    })
}