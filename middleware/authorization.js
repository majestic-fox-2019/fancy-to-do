const {User} = require('../models')
module.exports = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(result =>{
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