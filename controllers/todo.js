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
            res.send(err)
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
            if(!data){
                next({name:'not found'})
            }else{
                res.status(200).json(data)
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
            UserId : req.user.id
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
        Todo
        .update({
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
        .then(data =>{
            if(data[0] === 0){
                next({name:'not found'})
            }else{
                res.status(200).json(data)
            }
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
            console.log(data)
            if(data[1] === 0){
                next({name : 'not found'})
            }else{
                res.status(200).json(data[0])
            }
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller