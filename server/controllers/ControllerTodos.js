"use strict"
if (process.env.NODE_ENV==='development') {
    require('dotenv').config()    
}

const sendEmail = require('../helpers/api')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TodoModel = require('../models').Todo


class ControllerTodos {

    static create (req, res, next){
        
        let {title, description, status, due_date } = req.body
        let todo = {
            title,
            description,
            status,
            due_date,
            UserId : req.user.id
        }        
        // console.log(req.user, )
        TodoModel.create(todo)
        .then(result =>{
            let msg = sendEmail(req.user.email, `${result.description} Has been added to your todo list`)
            sgMail.send(msg)
            res.status(200).json(result)
        })
        .catch (err=>{
            console.log(err);
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

        console.log(title, description, status,due_date)
        TodoModel.findOne({
            where: {
                id : req.params.id  
            }
        })        
        .then(result =>{
            // res.send({res : result, user : req.user})
            if (result.UserId == req.user.id) {
                // res.send(result.UserId == req.user.id)
                let msg = sendEmail(req.user.email, `${result.description} has been updated to be ${description}`)
                sgMail.send(msg)
                // res.status(200).json(result)
                // console.log(title)
                return TodoModel.update(
                    {
                        title,
                        description,
                        status,
                        due_date
                    },{
                        where: {
                            id : req.params.id
                        },
                        returning : true
                    })
            } else {
                throw {
                    statusCode: 400,
                    msg: 'validation errors'
                }
            }
        })
        .then(result =>{
            // res.send(result)
            res.status(200).json(result[1][0])
        })
        .catch (err=>{
            next(err)
        })
    }

    static destroy (req, res, next){
        const findOne = TodoModel.findOne({
            where: {
                id: Number(req.params.id)
            }
        })

        const destroy = TodoModel.destroy({
            where: {
                id : Number(req.params.id)
            }
        })

        Promise.all([findOne, destroy])
        .then(result =>{
            // console.log(result[0].description, "awawoaowkaowkaowkaok")
            if (result[0]) {
                res.status(200).json(result[0])
                let msg = sendEmail(req.user.email, `${result[0].description} Has Been Removed From Your Todo List`)
                sgMail.send(msg)
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