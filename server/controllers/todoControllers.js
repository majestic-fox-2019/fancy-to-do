const { Todo, User } = require('../models')
const createError = require('http-errors')

class TodoController {
  static getUserTodos(req, res, next) {
    Todo.findAll({ where: { UserId: req.loggedIn.id, ProjectId: null } }, { include: [User] })
      .then(result => {
        if(result.length == 0) {
          throw {errCode: 404, msg: 'You dont have any todo yet'}
        } else {
          res.status(200).json(result)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllTodos(req, res, next) {
    Todo.findAll({ include: [User] })
      .then(result => {
        if(result.length == 0) {
          throw {errCode: 404, msg: 'You dont have any todo yet'}
        } else {
          res.status(200).json(result)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static createTodo(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      status: 'ongoing',
      due_date: req.body.due_date,
      UserId: req.loggedIn.id,
      ProjectId: req.body.project_id || null
    }
    Todo.create(data)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodo(req, res, next) {
    const id = req.params.id
    let data = null
    Todo.findOne({ where: { id: id } })
      .then(result => {
        data = result
        return Todo.destroy({ where: { id: result.id } })
      })
      .then(n => {
        res.status(200).json({
          deleted: n,
          data: data
        })
      })
      .catch(err => { 
        next(err)
      })
  }

  static updateTodo(req, res, next) {
    const id = req.params.id
    const data = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date
    }
    Todo.update(data, { where: { id: id }, returning: true, plain: true })
      .then(result => {
        res.status(200).json(result[1])
      })
      .catch(err => {
        next(err)
      })
  }

  static patchStatus(req, res, next) {
    const id = req.params.id
    const data = {
      status: req.body.status
    }
    Todo.update(data, { where: { id: id }, returning: true })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodoController
