if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const Index = require('../models/index')
const Task = Index.Task
const createError = require('http-errors')
const sentEmail = require('../helpers/sentEmail')

class TaskController {

  static add(req, res, next) {
  
    let addTask = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.user.id
    }

    Task.create(addTask)
    .then(result => {        
        sentEmail(req.user.user, req.body.title, req.body.description, req.body.due_date)
        res.status(201).json(result)
      })
      .catch(err => {
        next(createError(400, { message: { error: "Validation Errors" } }))
      })

  }

  static list(req, res, next) {
    Task.findAll({ where: { UserId: req.user.id }, order: [['id', 'ASC']] })
      .then(result => {
        if (result.length == 0) {
          throw createError(200, 'Data is empty.')
        } else {
          res.status(200).json(result)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static findOneData(req, res, next) {
    let id = req.params.id

    Task.findByPk(id)
      .then(result => {
        if (result != null) {
          res.status(200).json(result)
        } else {
          throw createError(404, { message: { error: 'error not found' } })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    let taskId = {
      where: {
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
        if (result[0] === 0) {
          throw createError(404, { message: { error: 'error not found' } })
        } else {
          res.status(200).json(taskUpdate)
        }
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          next(createError(400, { message: { error: "Validation Errors" } }))
        } else {
          next(err)
        }
      })

  }

  static delete(req, res, next) {
    let taskId = req.params.id
    let destroyTaskId = {
      where: {
        id: req.params.id
      }
    }
    let findTaskDelete = Task.findByPk(taskId)
    let destroyTask = Task.destroy(destroyTaskId)
    Promise.all([findTaskDelete, destroyTask])
      .then(result => {
        if (result === null) {
          throw createError(404, { message: { error: 'error not found' } })
        } else {
          res.status(200).json(result[0])
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TaskController