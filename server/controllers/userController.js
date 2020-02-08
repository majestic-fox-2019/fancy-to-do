const {User} = require('../models')
const {compare} = require('../helper/bycript')
const {generateToken} = require('../helper/jwt')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library')
const instance = axios.create({
  baseURL: `https://api.mailboxvalidator.com/v1/validation/single?key=${process.env.CheckEmailApi}&`
});
class Usercontroller{
  static facebookLogin(req, res, next){
    console.log('haih')
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(exists=>{
      console.log('mana')
      if(exists == null){
        console.log('sini')
        req.body.username = req.body.name
        req.body.email = req.body.email
        req.body.password = Math.round(Math.random()*10000)
        Usercontroller.register(req,res,next)
      }else{
        console.log('ada')
        let obj = {
          id: exists.id,
          username : exists.username,
          email : exists.email
        }
        let token = generateToken(obj, process.env.secret_code);
        console.log(token,'<<')
        res.status(200).json({accessToken: token})
      }
    })
    .catch(err=>{
      console.error
    })
  }

  static googleLogin(req,res,next){
    const client = new OAuth2Client(process.env.CLIENT_ID)
    console.log(client,'<<<')
    let name
    let email
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: req.body.token,
          audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      return payload
      // const userid = payload['sub'];
    }    
    verify()
      .then(data=>{
        console.log(data)
        name = data.name
        email = data.email
        return User.findOne({
          where: {
            email: data.email
          }
        })
      })
      .then(exists=>{
        if(exists == null){
          req.body.username = name
          req.body.email = email
          req.body.password = Math.random()*10000
          Usercontroller.register(req,res,next)
        }else{
          console.log('ada')
          let obj = {
            id: exists.id,
            username : exists.username,
            email : exists.email
          }
          let token = generateToken(obj, process.env.secret_code);
          console.log(token,'<<')
          res.status(200).json({accessToken: token})
        }
      })
      .catch(err=>{
        console.error
      })
  }
  static register(req,res,next){
    console.log(req.body,'yo')
    // instance.get(`&email=${req.body.email}`)
    //   .then(result=>{
    //     if(result.data.is_verified == 'True'){
          let data = {
            username: req.body.username,
            email: req.body.email,
            password: String(req.body.password)
          }
    User.create(data)

          // return User.create(data)
        // }else{
        //   throw {
        //     status: 401,
        //     message: 'email is not valid'
        //   }
        // }
      // })
      .then(data=>{
        console.log(data)
        let obj = {
          id: data.id,
          username: data.username,
          email: data.email,
        }
        console.log(obj)
        let token = generateToken(obj, process.env.secret_code);
        res.status(201).json({accessToken: token})
      })
      .catch(err=>{
        console.log(err)
        next(err)
      })
  }
  static login(req,res,next){
    console.log(req.body)
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