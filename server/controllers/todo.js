'use strict'

const { Todo } =require('../models')

class todoCOntroller {
    static create (req, res, next) {
        const {title, description, status, due_date} = req.body
        Todo.create({
            title,
            description,
            status,
            due_date
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }
    static readAll (req, res, next){
        Todo.findAll({
            order: [['due_date', 'DESC']]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
    static readOne (req, res, next){
        const { id } = req.params
        Todo.findOne({
            id: id
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
    static update (req, res, next){
        const { title, description, status, due_date } = req.body
        const { id } = req.params
        Todo.update({
            title,
            description,
            status,
            due_date
        },
        {
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
    static delete (req, res, next){
        const { id } = req.params
        Todo.destroy({
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = todoCOntroller