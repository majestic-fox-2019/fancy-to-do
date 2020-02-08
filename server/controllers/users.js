const {User} = require("../models")
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const {jwtSign} = require('../helper/helper')
const axios = require('axios')
const instance = axios.create({
  baseURL: process.env.debounce_api,
});
class userController {
  static googleLogin(req,res,next){
    let email = req.decode.email
    User
      .findOne({
        where : {
          email : email
        }
      })
    .then(user => {
      if(user){
        return user
      }else{
        const password = email
        return User
                .create(
                  {
                    email,password
                  }
                )
      }
    })
    .then(user => {
      let obj = {
        id : user.id,
        email : user.email
      }
      let payload = {
        token : jwtSign(obj)
      }
      res.status(200).json(payload)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static register(req,res,next){
    const {email,password} = req.body
    instance
      .get(`&email=${email}`)
      .then(response => {
        if(response.data.debounce.result === "Invalid"){
          throw createError(400,"Email not valid")
        }else{
          return User
                  .create(
                    {
                      email,password
                    }
                  )
        }
        
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        if(email){
          next(err)
        }else{
          next(createError(400,"Email is empty"))
        }
      })
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
          throw createError(404,"Email not found")
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
          let payload = {
            token : jwtSign(result)
          }
          res.status(200).json(payload)
        }else{
          throw createError(404,"Password false")
        }
      })
      .catch(next)
  }
}
module.exports = userController