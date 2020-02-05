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
          if (result.UserId !== req.user.id || !req.user) {
            throw createError(401, { message: { error: 'Not Authorized' } })
          } else {
            res.status(200).json(result)
          }
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

    Task.findByPk(req.params.id)
      .then(result => {
        if (result.UserId !== req.user.id || !req.user) {
          throw createError(401, { message: { error: 'Not Authorized' } })
        } else {
          return Task.update(taskUpdate, taskId)
        }
      })
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
    let data = {}
    Task.findByPk(taskId)
      .then(result => {
        data = result
        return Task.destroy(destroyTaskId)
      })
      .then(result => {
        if (data === null) {
          throw createError(404, { message: { error: 'error not found' } })
        } else {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TaskController