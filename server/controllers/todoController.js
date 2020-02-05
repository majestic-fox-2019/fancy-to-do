const Todo = require('../models').Todo;

class TodoController{
    static create(req,res,next){
        console.log(req.body)
        const body = {
            title : req.body.title,
            desc : req.body.desc,
            due_date : req.body.due_date,
            UserId : req.user.id
        }
        Todo.create(body)
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }
    
    static read(req,res,next){
        Todo.findAll()
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static readOne(req,res,next){
        Todo.findByPk(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static update(req,res,next){
        Todo.update(req.body,{
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static delete(req,res,next){
        Todo.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console,log(err)
            next(400)
        })
    }
}

module.exports = TodoController