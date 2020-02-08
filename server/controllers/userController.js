if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const {OAuth2Client} = require('google-auth-library');
const {User} = require('../models')
const createError = require('http-errors')
const {checkPassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const {createToken} = require('../helpers/jwt')


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
      next(err)
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
          email: user.email
        }
        console.log('masuk if')
        res.status(200).json({token: createToken(obj)})
      } else {
        let data = {
          email: payload.email
        }
        console.log(data, 'masuk else')
        return User.create(data)
      }
    })
    .then(result => {
      return User.findOne({where: {email: result.email}})
    })
    .then(result => {
      let obj = {
        id: result.id,
        email: result.email
      }
      res.status(200).json({token: createToken(obj)})
    })
    .catch(error => {
      next(error)
    })
  }

  static login(req, res, next){
    console.log(req.body)
    const data = {
      where: {
        email: req.body.email
      }
    }
    User.findOne(data)
    .then(user => {
      console.log(user)
      if (!user){
        throw createError(404, {message: { error: 'Not Found'}})
      } else {
        if (checkPassword(req.body.password, user.password)){
          let obj = {
            id: user.id,
            email: user.email
          }
          res.status(200).json({token: createToken(obj)})
        } else {
          throw createError(401, {message: { error: 'Username / Password wrong.'}})
        }
      }
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = UserController