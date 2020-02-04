'use strict'

const { Todo } =require('../models')

class todoCOntroller {
    static create (req, res, next) {
        const {tittle, description, status, due_date} = req.body
        Todo.create({
            tittle,
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