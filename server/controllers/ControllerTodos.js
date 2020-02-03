"use strict"
const TodoModel = require('../models').Todo

class ControllerTodos {

    static create (req, res, next){
        
        let {title, description, status, due_date } = req.body
        
        // res.status(200).json(req.body)
        TodoModel.create(
                {
                    title,
                    description,
                    status,
                    due_date
                }
                    )
        .then(result =>{
                res.status(201).json(result)
        })
        .catch (err=>{
            next(err)
        })
    }

    static read (req, res, next){
                
        TodoModel.findAll()
        .then(result =>{
            res.status(200).json(result)
        })
        .catch (err=>{
            next(err)
        })
    }

    static find (req, res, next){
        TodoModel.findByPk(req.params.id)
        .then (result =>{
            if (result) {
                res.status(200).json(result)                
            } else {
                throw {
                    statusCode: 404,
                    msg: "ID not found"
                }
            }
        })
        .catch(err =>{
           next(err)
        })
    }
    
    static update (req, res, next){

        let {title, description, status, due_date } = req.body
                
        TodoModel.update(
            {
                title,
                description,
                status,
                due_date
            },{
                where: {
                    id : req.params.id
                }
            }
        )
        .then(result =>{
            if (result) {
                res.status(200).json(result)        
            } else {
                throw {
                    statusCode: 400,
                    msg: 'validation errors'
                }
            }
        })
        .catch (err=>{
            next(err)
        })
    }

    static destroy (req, res, next){
                
        TodoModel.destroy({
            where: {
                id : Number(req.params.id)
            }
        })
        .then(result =>{
            if (result) {
                res.status(200).json(result)
            } else {
                throw {
                    statusCode: 404,
                    msg: "ID not found"
                }
            }
        })
        .catch (err=>{
            next(err)
        })
    }


}

module.exports = ControllerTodos