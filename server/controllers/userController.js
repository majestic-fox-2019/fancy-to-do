if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const {OAuth2Client} = require('google-auth-library');
const {User} = require('../models')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class UserController {

  static register(req, res, next){
    let userData = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(userData)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      next(createError(400, {message: {error:"Validation Errors"}}))
    });
  }

  static onSignIn(req, res, next){
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let payload = null
    
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
    .then(result => {
      payload = result.getPayload()
      return User.findOne({where: {email: payload.email}})
    })
    .then(user => {
      if (user){
        let obj = {
          id: user.id,
          user: user.email
        }
        res.status(200).json({token: jwt.sign(obj, process.env.SECRET_CODE)})
      } else {
        let data = {
          email: payload.email
        }
        return User.create(data, {hooks: false})
      }
    })
    .then(result => {
      let obj = {
        id: result.id,
        user: result.email
      }
      res.status(200).json({token: jwt.sign(obj, process.env.SECRET_CODE)})
    })
    .catch(error => {
      next(error)
    })
  }

  static login(req, res, next){
    const data = {
      where: {
        email: req.body.email
      }
    }
    User.findOne(data)
    .then(user => {
      console.log(user, 'HALO')
      if (!user){
        throw createError(404, {message: { error: 'Not Found'}})
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)){
          let obj = {
            id: user.id,
            user: user.email
          }
          res.status(200).json({token: jwt.sign(obj, process.env.SECRET_CODE)})
        } else {
          throw createError(401, {message: { error: 'Not Authorized'}})
        }
      }
    })
    .catch(err => {
      next()
    })
  }

}

module.exports = UserController