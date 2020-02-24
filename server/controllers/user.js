const {User, Todo} = require('../models')
const createError = require('http-errors')
const {generateToken} = require('../helpers/generateToken')
const {comparePassword} = require('../helpers/comparePassword')

class Controller{
    static register(req, res, next){
        const {email, password} = req.body
        User
        .findOne({
            where:{
                email:email
            }
        })
        .then(data =>{
            if(data){
                throw createError(409, 'Email already register')
            }else{
                return User.create({
                    email,
                    password
                })
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static login(req, res, next){
        const { email, password } = req.body
        User
        .findOne({
            where:{email:email}
        })
        .then(data =>{
            if (!data) {
                throw createError(404, 'User Not Found') 
            }else{
                if (comparePassword(password, data.password)) {
                    const payload = {
                        id: data.id,
                        email:data.email
                    }
                    const token = generateToken(payload)
                    res.status(200).json({token: token})
                }else{
                    throw createError(401, 'Invalid Email or Password')
                }
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static listTodo(req, res, next){
        User
        .findOne({
            include: Todo,
            where:{
                id:req.user.id
            }
        })
        .then(data =>{
            res.json(data.Todos)
        })
        .catch(err =>{
            next(err)
        })
    }
    static signInGoogle(req, res, next) {
        const email = req.body.email;
        console.log(req.body)
		const password = process.env.API_GOOGLE;
        User
        .findOne({
                    where: {
                        email: email
                    }
		})
			.then(data => {
				if (!data) {
					const obj = {
						email: email,
						password: password
					}
					return User.create(obj);
				} else {
					const payload = {
                        id: data.id,
                        email:data.email
                    }
                    const token = generateToken(payload)
                    res.status(200).json({token: token})
				}
			})
			.then(data => {
				const payload = {
                    id: data.id,
                    email:data.email
                }
                const token = generateToken(payload)
                res.status(200).json({token: token})
			})
            .catch(err =>{
                next(err)
            })
	}
}

module.exports = Controller