const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const createError = require('http-errors')



class ControllerUser {

  static register(req,res,next){
      let data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password
      }

      User.findOne({
        where : {
          email : data.email
        }
      })
      .then(avail=>{
        if(avail){
          
        throw createError(404,'email already exists')

        } else{
          User.create(data)
          .then(result=>{
            res.status(201).json(result)
          })
          .catch(err=>{
            throw err
          })
        }
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

  static googleSignIn(req,res,next){
    client.verifyIdToken({
      idToken : req.body.id_token,
      audience : '805990535894-9oa8ccvfgh0auoufqog8dkqae3n5vera.apps.googleusercontent.com'
    })
    .then(ticket=>{
      
      let payload = ticket.getPayload()
   
      User.findOne({where : {email : payload.email}})
      .then(user=>{
        if(user){
          const token = jwt.sign({id : user.id}, process.env.SECRET_CODE)
          res.status(200).json(token)
        } else {
          User.create({
            name : payload.name,
            email: payload.email,
            password : "default password"
          })
          .then(user =>{
            const token = jwt.sign({ id: user.id}, process.env.SECRET_CODE)
            res.status(200).json(token)
          })
        }
      })
      .catch(err=>{
        next(err)
      })
    })
  }

}

module.exports = ControllerUser