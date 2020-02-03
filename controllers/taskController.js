const Index = require('../models/index')
const Task = Index.Task

class TaskController {

  static add(req, res, next){
    let addTask = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    
    Task.create(addTask)
    .then(result => {
      let response = {
        statusCode: 201,
        response: result
      }
      next(response)
    })
    .catch(err => {
      let errorMessage = {
        statusCode: 400,
        response: err.errors[0].type
      }
      next(errorMessage)
      })

  }

  static list(req, res, next){
    Task.findAll()
    .then(result => {
      let response = {}
      if (result.length == 0){
        response.statusCode = 200,
        response.response = 'Data is empty.'
      } else {
        response.statusCode = 200,
        response.response = result
      }
      next(response)
    })
    .catch(err => {
      let error = {
        statusCode: 500,
        response: err
      }
      next(error)
    })
  }

  static findOneData(req, res, next){
    let id = req.params.id

    Task.findByPk(id)
    .then(result => {
      let response = {}
      if (result != null){
        response.statusCode = 200,
        response.response = result
      } else {
        response.statusCode = 404,
        response.response = {error: 'error not found'}
      }
      next(response)
    })
    .catch(err => {
      next(response)
    })
  }

}

module.exports = TaskController