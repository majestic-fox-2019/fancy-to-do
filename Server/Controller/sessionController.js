const {User} = require('../models')
const createError = require('http-errors')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken')

class UserController {

    static Register(req,res,next){
        let isi = {
            username:req.body.username,
            password:req.body.password,
            name:req.body.name,
            email:req.body.email}
        User
        .create(isi)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            if(err.message){
                err.StatusCode = 400
            }
            next(err)
        })
    }

    static Login(req,res,next){
        let email =req.body.email
        let password = req.body.password
        // console.log('masuk')
        User
        .findOne({where:
            {
                email:email
            }})
        .then(user=>{
            if(user){
                console.log('masuk')
                if(bcrypt.compareSync(password, user.password)){
                    let token = jwt.sign({email:user.email,id:user.id},process.env.secret_key)
                    res.status(201).json(token)
                }
                else{
                    // throw createError(404,'Error 404,username or password wrong')
                    let msg= {
                        StatusCode :'404',
                        message:'Username or password wrong'
                    }
                    next(msg)
                }
            }
            else{
                // throw createError(404,'Error 404,command not found')
                let msg= {
                    StatusCode :'404',
                    message:'command not found'
                }
                next(msg)
            }
        })
        .catch(err=>{
            if(err.message){
                err.StatusCode = 400
            }
        })
    }
}

module.exports = UserController

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpZCI6MSwiaWF0IjoxNTgwNzk1NTQwfQ.COKHS2BE6sw7BzLtzxeX3KBUDH0bs_tLUYpaOus1_tw