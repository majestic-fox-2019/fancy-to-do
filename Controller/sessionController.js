const {User} = require('../models')
const createError = require('http-errors')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken')

class UserController {

    static Register(req,res,next){
        let isi = {
            username:req.body.username,
            password:req.body.password}
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
        let username =req.body.username
        let password = req.body.password
        User
        .findOne({where:
            {
                username:username
            }})
        .then(user=>{
            if(user){
                if(bcrypt.compareSync(password, user.password)){
                    let token = jwt.sign({username:user.username,id:user.id},process.env.secret_key,{expiresIn:100})
                    res.status(201).json(token)
                }
                else{
                    throw createError(404,'Error 404,username or password wrong')
                }
                
            }
            else{
                throw createError(404,'Error 404,command not found')
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