const { User } = require('../models')
const bcrypt = require('bcrypt')
const helper = require('../helpers/helper')

class UserController {
  static login(req, res, next){
    let email = req.body.email
    let password = req.body.password
    User.findOne({
      where: { email : email }
    })
    .then(users => {
      if(bcrypt.compare(password, users.password)){
        const obj = {
          id: users.id,
          email: users.email
        }
        const token = helper.authSign(obj)
        res.status(200).json({ Token : token })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static loginGoogle(req, res, next){
    let email = req.body.email
    let pass = process.env.GOOGLE_PASS
    User.findOne({
      where: {
        email: email
      }
    })
    .then(result => {
      if(!result){
        let objUser = {
          email: email,
          password: pass
        }
        return User.create(objUser)
      }else{
        if(bcrypt.compare(pass, result.password)){
          const objUser = {
            id: result.id,
            email: result.email
          }
          const token = helper.authSign(objUser)
          res.status(200).json({ Token : token })
        }
      }
    })
    .then(result => {
      let objUser = {
        id: result.id,
        email: result.email,
      }
      const token = helper.authSign(objUser)
      res.status(200).json({ Token : token })
    })
    .catch(err => {
      next(err)
    })
  }

  static registerUser(req, res, next){
    const objData = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email : objData.email
      }
    })
    .then(user => {
      if(!user){
        return User.create(objData)
      }else{
        next({
          statusCode: 404,
          message: "Email has been registered"
        })
      }
    })
    .then(newuser => {
      res.status(201).json(newuser)
    })
    .catch(err => {
      next(err)
    })
  }

  static getUsers(req, res, next){
    User.findAll({
      order: [['id', 'DESC']]
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController