const {Todo} = require('../models')

class Controller {
    static findAll(req, res, next){
        Todo
        .findAll()
        .then(data =>{
            res.status(200).json(data)
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
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static create(req, res, next){
        const {title, description, status, due_date} = req.body
        Todo
        .create({
            title,
            description,
            status,
            due_date
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            res.send(err.errors)
            // next(err)
        })
    }
    static update(req, res, next){
        const {title, description, status, due_date} = req.body
        Todo
        .update({
            title,
            description,
            status,
            due_date,
        },{
            where:{
                id:req.params.id
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static destroy(req, res, next){
        Todo
        .destroy({
            where:{
                id:req.params.id
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller