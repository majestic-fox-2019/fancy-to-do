const {Todo} = require('../models')
const createError = require('http-errors')

class Controller {
    static findAll(req, res, next){
        Todo
        .findAll({
            where:{UserId:req.user}
        })
        .then(data =>{
            if (data.length > 0) {
                res.status(200).json(data)
            } else {
                throw createError(404, 'Data Not Found')
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static findOne(req, res, next){
        Todo
        .findOne({
            where:{
                id:req.params.id
            }
        })
        .then(data =>{
            if(data){
                res.status(200).json(data)
            }else{
                throw createError(404, `Data Not found`)
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static create(req, res, next){
        console.log(req.user)        
        const {title, description, status, due_date} = req.body
        Todo
        .create({
            title,
            description,
            status,
            due_date,
            UserId : req.user
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static update(req, res, next){
        const {title, description, status, due_date} = req.body
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        .then( data =>{
            if (data.UserId === req.user) {
                return Todo.update({
                    title,
                    description,
                    status,
                    due_date,
                    },{
                        where:{
                            id:req.params.id
                        },
                    returning:true
                })
            }else{
                throw createError(403, 'Forbiden Acces')
            }
        })
        .then(data =>{
            res.status(200).json(data[1][0])
        })
        .catch(err =>{
            next(err)
        })
    }
    static destroy(req, res, next){
        const findOne = Todo.findOne({
            where:{
                id:req.params.id
            }
        })
        const destroy = Todo.destroy({
                        where:{id:req.params.id}
                    })
        Promise.all([findOne, destroy])
        .then(data =>{
            if (data[0] !== null && data[1] === 1) {
                res.status(200).json(data[0])
            } else {
                throw createError(404, 'Data Not Found')
            }
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller