const { Todo } = require('../models')
const helper = require('../helpers/helper')

exports.verifyToken = function(req, res, next){
  try{
    if(req.headers.bearer){
      let userToken = helper.authVerify(req.headers.bearer)
      if(userToken){
        req.user = userToken
        next()
      }
    }else{
      next({
        statusCode: 402,
        message: "Bearer is invalid"
      })
    }
  }
  catch(err){
    next(err)
  }
}

exports.authorUser = function(req, res, next){
  const id_todo = req.params.id
  Todo.findOne({
    where: {
      id: id_todo,
      UserId: req.user.id
    }
  })
  .then(result => {
    if(result){
      next()
    }else{
      next({
        statusCode: 403,
        message: 'No access'
      })
    }
  })
  .catch(err => {
    next(err)
  })
}