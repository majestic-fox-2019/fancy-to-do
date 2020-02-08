'use strict'

const { Todo } =require('../models')

class todoCOntroller {
    static create (req, res, next) {
        console.log(req.body)
        console.log(req.id)
        Todo.create({
            tittle: req.body.title,
            description: req.body.description,
            status: 'not yet',
            due_date: req.body.due_date,
            UserId: req.id
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }
    static readAll (req, res, next){
        // Todo.findAll({
        //     order: [['due_date', 'DESC']]
        // })
        Todo.findAll({
            where: {
                UserId: req.id
            },
            order: [['due_date']]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
    static readOne (req, res, next){
        const { id } = req.params
        Todo.findOne({
            where: {
                id
            }
        })
        .then(result => {
            if(!result){
                throw {code: 404, message: 'data not found'}
            }
            else {

                res.status(200).json(result)
            }
        })
        .catch(next)
    }
    static update (req, res, next){
        const { tittle, description, status, due_date } = req.body
        const { id } = req.params
        Todo.update({
            tittle,
            description,
            status,
            due_date
        },
        {
            where: { id },
            returning: true,
            plain: true
        }
        )
        .then(result => {
            res.status(200).json(result[1])
        })
        .catch(next)
    }
    static delete (req, res, next){
        const { id } = req.params
        let todo = null
        Todo.findOne({
            where: {
                id
            }
        })
        .then(result => {
            todo = result
            return Todo.destroy({
                where: {
                    id: result.id
                }
            })
        })
        .then(() => {
            res.status(200).json(todo)
        })
        .catch(next)
    }
}

module.exports = todoCOntroller