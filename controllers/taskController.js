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
        response: {error : "Validation Errors"} 
      }
      next(errorMessage)
      })

  }

  static list(req, res, next){
    Task.findAll({ order: [['id', 'ASC']]})
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

  static update(req, res, next){
    let taskId = {
      where : {
        id: req.params.id
      }
    }

    let taskUpdate = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Task.update(taskUpdate, taskId)
    .then(result => {
      let response = {}
      if (result[0] >= 1){
        response.statusCode = 200,
        response.response = taskUpdate
      } else {
        response.statusCode = 404,
        response.response = {error: 'error not found'}
      }
      next(response)
    })
    .catch(err => {
      let errorMessage = {
        statusCode: 400,
        response: {error : "Validation Errors"}
      }
      next(errorMessage)
    })
  }

  static delete(req, res, next){
    let taskId = req.params.id
    let destroyTaskId = {
      where: {
        id: req.params.id
      }
    }
    let data = {}
    let response = {}
    Task.findByPk(taskId)
    .then(result => {
      data = result
      return Task.destroy(destroyTaskId)
    })
    .then(result => {
      if (data === null){
        response.statusCode = 404,
        response.response = {error: 'error not found'}
      } else {
        response.statusCode = 200,
        response.response = data
      }
      next(response)
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = TaskController