const Todo = require('../models').Todo
const User = require('../models').User
const Project = require('../models').Project

class TodoController {
    static showData(req, res, next) {
        Todo.findAll({ where  :{ UserId : ( req.user.id ).toString() }, order:[["id","asc"]] })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static showOne(req, res, next) {
        Todo.findOne({ where: { id: req.params.id } })
            .then(result => {
                if (!result) {
                    next({ code: 404, message: "todo not found" })
                } else {
                    res.status(200).json(result)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next) {
        const todoObj = {
            title: req.body.title,
            desctiption: req.body.desctiption,
            status: "Not started yet",
            due_date: req.body.due_date,
            UserId:Number(req.user.id)
        }
        Todo.create(todoObj)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        const todoObj = {
            title: req.body.title,
            desctiption: req.body.desctiption,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(todoObj, { 
            where: { id: req.params.id }, 
            returning: true 
        })
            .then(result => {
                if (result[0] === 0) {
                    next({ code: 404, message: "todo not found" })
                } else {
                    res.status(200).json(result)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        let todoFound
        Todo.findOne({ where: { id: req.params.id } })
            .then(result => {
                todoFound = result
                return Todo.destroy({ where: { id: req.params.id } })
            })
            .then(result => {
                if (result === 0) {
                    next({ code: 404, message: "todo not found" })
                } else {
                    res.status(200).json(todoFound)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static filter(req, res, next) {
        Todo.findAll({where:{status :req.params.status, UserId:( req.user.id ).toString() }})
        .then(result => {
            if(result.length == 0){
                next({ code: 404, message: "todo not found"})
            } else {
                res.status(200).json(result)
            }
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = TodoController