if(process.env.NODE_ENV==="development"){
    require("dotenv").config();
}
const {User}= require("../models");
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

class userController{
    static register(req,res,next){
        let objInput={
            email:req.body.email,
            password:req.body.password
        }
        User    
            .create(objInput)
            .then(result=>{
                res.status(201).json(result)
            })
    }
    static login(req,res,next){
        let password = req.body.password;
        let email = req.body.email;
        User
            .findOne(
            {
                where:{
                    email:email
                }
            })
            .then(result=>{
                let compare = bcrypt.compareSync(password, result.password);
                if(compare){
                    let token = jwt.sign({ email:result.email, id:result.id }, process.env.secretCode);
                    res.status(201).json(token);
                }
                else{
                    throw{
                        statusError : 400,
                        message:"email or password is false"
                    }
                }
            })
            .catch(err=>{
                next(err)
            })
    }
}
module.exports= userController