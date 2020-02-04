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

  static registerUser(req, res, next){
    const objData = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(objData)
      .then(result => {
        res.status(201).json(result)
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

  static detailUser(req, res, next){

  }

  static updateUser(req, res, next){

  }

  static destroyUser(req, res, next){

  }
}

module.exports = UserController