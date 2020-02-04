const {User} = require('../models')
const {compare} = require('../helper/bycript')
const {generateToken} = require('../helper/jwt')
const axios = require('axios')
const instance = axios.create({
  baseURL: `https://api.mailboxvalidator.com/v1/email/free?key=${process.env.CheckEmailApi}&`
});
class Usercontroller{
  static register(req,res,next){
    instance.get(`&email=${req.body.email}`)
      .then(result=>{
        if(result.data.is_verified == 'True'){
          let data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          }
          return User.create(data)
        }else{
          throw {
            status: 400,
            message: 'email is not valid'
          }
        }
      })
      .then(data=>{
        res.status(201).json(data)
      })
      .catch(err=>{
        next(err)
      })
  }
  static login(req,res,next){
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user=>{
        if(user == null){
          throw {
            status: 404,
            message: 'email/password is wrong'
          }
        }else{
          if(compare(user.password,req.body.password)){
            let obj = {
              id: user.id,
              username : user.username,
              email : user.email
            }
            let token = generateToken(obj, process.env.secret_code);
            res.status(200).json({accessToken: token})
          }else{
            throw {
              status: 404,
              message: 'email/password is wrong'
            }
          }
        }
      })
      .catch(err=>{
        next(err)
      })
  }
}

module.exports = Usercontroller