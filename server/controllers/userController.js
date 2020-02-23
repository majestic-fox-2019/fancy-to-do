const User = require('../models').User;
const {comparer} = require('../helpers/bcrypt');
const {tokenSigner} = require('../helpers/jwt');

class UserController {
    static register(req,res,next){
        User.create(req.body)
        .then(response => {
            let user = {
                id : response.id,
                email : response.email,
                password : response.password,
            }
            let token = tokenSigner(user)
            res.status(201).json(token)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
    
    static login(req,res,next){
        User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(response =>{
            if(!response){
                next('user-not-found')
            } else {
                if(comparer(req.body.password,response.password)){
                    let user = {
                        id : response.id,
                        email : response.email,
                        password : response.password,
                    }
                    let token = tokenSigner(user)
                    res.status(200).json(token)
                } else {
                    next('invalid-password')
                }
            }
        })
    }
    
}

module.exports = UserController