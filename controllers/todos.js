const { Todo } = require('../models/index')
const Helper = require('../helper/helper')
const createError = require('http-errors')

class TodoController {

    static find (req, res, next){
        Todo
          .findAll()
          .then(result => {
            if(result.length > 0){
              res.status(200).json(result)
            }else{
              throw createError(200, 'Data is empty!')
            }
          })
          .catch(err => {
            next(err)
          })
    }

    static create(req, res, next){
      let objValue = {
        title : req.body.title,
        description : req.body.description,
        status : req.body.status,
        due_date : req.body.due_date
      }

      Todo
        .create(objValue)
        .then(result => {
          res.status(201).json(result)
        })
        .catch(err => {
          if(err.name === 'SequelizeValidationError'){
            next(createError(400, {message : Helper.errorFormatter(err.errors) }))
          }else{
            next(err)
          }
        })
    }

    static findById(req, res, next){
      Todo
        .findByPk(req.params.id)
        .then(response => {
          if(response !== null){
            res.status(200).json(response)
          }else{
            throw createError(404, 'Not Found')
          }
        })
        .catch(err => {
          next(err)
        })
    }

    static update(req, res, next){
      let objValue = {
        title : req.body.title,
        description : req.body.description,
        status : req.body.status,
        due_date : req.body.due_date
      }

      Todo
        .update(objValue, {
          where : {
            id : req.params.id,
          },
          returning : true
        })
        .then(response => {
          if(response[0] > 0){
            res.status(200).json(response[1][0])
          }else{
            throw createError(404, 'Not Found')
          }
        })
        .catch(err => {
          if(err.name === 'SequelizeValidationError'){
            next(createError(400, { message : Helper.errorFormatter(err.errors) }))
          }else{
            next(err) 
          }
        })
    }

    static destroy(req, res, next){
      let data = {}

      Todo
        .findByPk(req.params.id)
        .then(response => {
          data = response
            return Todo.destroy({
              where : {
                id : req.params.id
              }
            })
        })
        .then(response => {
          if(data === null){
            throw createError(404, 'Not Found')
          }else{
            res.status(200).json(data)
          }
        })
        .catch(err => {
          next(err)
        })
    }

}

module.exports = TodoController