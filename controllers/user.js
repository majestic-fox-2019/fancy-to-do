const { User } = require('../models/index')
const Helper = require('../helper/helper')
const signUser = require('../helper/jwtSign')
const comparePassword = require('../helper/comparePassword')
const createError = require('http-errors')


class UserController {

    static register(req, res, next){
        let objValue = {
            username : req.body.username,
            password : req.body.password
        }

        User
          .create(objValue)
          .then(response => {
              res.status(200).json(response)
          })
          .catch(next)
    }

    static login(req, res, next){
      User
        .findOne({
          where : {
            username : req.body.username
          }
        })
        .then(response => {
          if(comparePassword(req.body.password, response.password)){
            const user = Helper.authData(response.dataValues)
            const token = signUser(user)
            res.status(201).json({ token })
          }else{
            throw createError(403, {message : { error : 'Unauthorized'}})
          }
        })
        .catch(next)
    }
    
}

module.exports = UserController