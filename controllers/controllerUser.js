const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


class ControllerUser {

  static register(req,res,next){
      let data = {
        email: req.body.email,
        password : req.body.password
      }

      User.create(data)
      .then(result=>{
        res.status(201).json(result)
      })
      .catch(err=>{
  
        let objErr={}
         objErr.statusCode = 400
         objErr.data = err.errors
        next(objErr)
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
        const message = {
          statusCode : 400,
          data : 'Error Email Not Found'
        }
        throw message
      }else{
        
        if(bcrypt.compareSync(data.password, result.dataValues.password)){
          let newObj = {
            id: result.id,
            email : result.email
          }
          res.status(200).json({token: jwt.sign(newObj, process.env.SECRET_CODE)})
        }else{
          let objErr={}
          objErr.statusCode = 404
          objErr.data = 'Pasword wrong'
        throw objErr
        }
      }
    })
    .catch(err=>{
      next(err)
    })
  }

}

module.exports = ControllerUser