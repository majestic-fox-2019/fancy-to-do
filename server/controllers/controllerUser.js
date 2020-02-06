const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const createError = require('http-errors')


class ControllerUser {

  static register(req,res,next){
      let data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password
      }

      User.create(data)
      .then(result=>{
        res.status(201).json(result)
      })
      .catch(err=>{
        next(err)
      })
    }

  static login (req,res,next){
    let data = {
      email: req.body.email,
      password : req.body.password
    }

    User
    .findOne({
      where: 
      {  email : data.email }
    })
    .then(result=>{
      if(result == null){
        res.status(404).json({message : 'email not found'})
      }else{
        
        if(bcrypt.compareSync(data.password, result.dataValues.password)){
          let newObj = {
            id: result.id,
            email : result.email
          }
          res.status(200).json({token: jwt.sign(newObj, process.env.SECRET_CODE)})
        }else{
          res.status(404).json({message : 'username or password wrong'})
      
        }
      }
    })
    .catch(err=>{
      next(err)
    })
  }

}

module.exports = ControllerUser