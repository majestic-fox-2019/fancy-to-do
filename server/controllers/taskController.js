if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const Index = require('../models/index')
const Task = Index.Task
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
      console.log(req.user)  
        sentEmail(req.user.email, req.body.title, req.body.description, new Date(req.body.due_date))
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })

  }

  static list(req, res, next) {
    Task.findAll({ where: { UserId: req.user.id }, order: [['id', 'ASC']] })
      .then(result => {
        if (result.length == 0) {
          res.status(200).json({ message : 'Data is empty.'})
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
        res.status(200).json(result)
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
      due_date: new Date(req.body.due_date)
    }

    Task.update(taskUpdate, taskId)
      .then(result => {
        res.status(200).json(taskUpdate)
      })
      .catch(err => {
        console.log('MASUK')
          next(err)
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
        res.status(200).json(result[0])
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TaskController