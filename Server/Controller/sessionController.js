const {User} = require('../models')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken')
let kirimEmail = require('../middleware/sendEmail')
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
            // console.log(data)
            res.status(201).json(data)
            kirimEmail(data.email,data.username)
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
                    console.log('masuk ni')
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
            next(err)
        })
    }

    static googleLogin(req,res,next){
        User
        .findOne({
            where:{email:req.payload.email}
        })
        .then(data=>{
            console.log(data)
            if(!data){
                return User.create({
                            username:req.payload.given_name,
                            name:req.payload.name,  
                            email:req.payload.email,
                            password:"user"
                        })
            }
            else{
                return data
            }
        })
        .then(data=>{
            let token = jwt.sign({email:data.email,id:data.id},process.env.secret_key)
            res.status(200).json(token)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = UserController

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpZCI6MSwiaWF0IjoxNTgwNzk1NTQwfQ.COKHS2BE6sw7BzLtzxeX3KBUDH0bs_tLUYpaOus1_tw