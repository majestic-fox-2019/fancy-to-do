if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class Controller{
    static register(req, res, next){
        const {email, password} = req.body
        User
        .create({
            email,
            password
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(400).json(err)
        })
    }
    
    static login(req, res, next){
        User
        .findOne({
            where:{email:req.body.email}
        })
        .then(data =>{
            console.log(data.password)
            console.log(req.body.password)
            // console.log(bcrypt.compare(req.body.password, data.password))
            if (!data) {
                console.log('masuk then')
                next({name:'not found'})
            }else{
                if (bcrypt.compareSync(req.body.password, data.password)) {
                    console.log('masuk else')

                    let userData = {
                        id: data.id,
                        email:data.email
                    }
                    res.status(200).json({token: jwt.sign(userData, process.env.SECRET_CODE)})
                }else{
                    next({name: 'token invalid'})
                }
            }
        })
        .catch(err =>{
            console.log('masuk catch')
            res.status(500).json(err)
        })
    }
}

module.exports = Controller