const {User,Todo} = require("../models")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
class userController {
  static register(req,res,next){
    const {email,password} = req.body
    User
      .create(
        {
          email,password
        }
      )
      .then(user => {
        res.status(201).json(user)
      })
      .catch(next)
  }

  static login(req,res,next){
    const {email,password} = req.body
    let result = null
    User
      .findOne(
        {
          where : {
            email
          }
        }
      )
      .then(user => {
        if(!user){
          next({
            statusCode : 404,
            message : "email not found"
          })
        }else{
          result = {
            id : user.id,
            email : user.email
          }
          return bcrypt.compare(password, user.password)
        }
      })
      .then(hash => {
        if(hash){
          res.status(200).json(jwt.sign(result, 'test'))
        }else{
          next({
            statusCode : 404,
            message : "password false"
          })
        }
      })
      .catch(next)
  }

  static authorization(req,res,next){
    const id = req.params.id
    Todo
      .findByPk(id)
      .then(todo => {
        if (todo){
          if(todo.UserId !== req.user.id){
            next({
              statusCode : 401,
              message : "Unauthorized"
            })
          }else{
            next()
          }
        }else{
          next({
            statusCode : 404,
            message : "todo not found"
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}
module.exports = userController