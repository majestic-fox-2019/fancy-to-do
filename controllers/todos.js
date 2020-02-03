const { Todo } = require('../models/index')
const Helper = require('../helper/helper')

let error = {
  statusCode : '',
  data : ''
}

class TodoController {

    static find (req, res, next){
        Todo
          .findAll()
          .then(result => {
            if(result.length > 0){
              res.status(200).json(result)
            }else{
              error.statusCode = 204
              error.data = 'Data is empty!'
              throw new Error(error)
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
            error.statusCode = 400
            error.data = Helper.errorFormatter(err.errors)
            next(error)
        })
    }

    static findById(req, res, next){
      Todo
        .findByPk(req.params.id)
        .then(response => {
          if(response !== null){
            res.status(200).json(response)
          }else{
            error.statusCode = 404
            error.data = "Not Found"
            throw new Error(error)
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
            error.statusCode = 404
            error.data = 'Not found'
            throw new Error(error)
          }
        })
        .catch(err => {
          error.statusCode = 400
          error.data = Helper.errorFormatter(err.errors)
          next(error)
        })
    }

    static destroy(req, res, next){
      let data = {}

      Todo
        .findByPk(req.params.id)
        .then(response => {
          data = response
            return Todo
            .destroy({
              where : {
                id : req.params.id
              }
            })
        })
        .then(response => {
          if(data === null){
            error.statusCode = 404
            error.data = 'Not found'
            throw new Error(error)
          }else{
            res.status(200).json(data)
          }
        })
        .catch(err => {
          next(error)
        })
    }

}

module.exports = TodoController