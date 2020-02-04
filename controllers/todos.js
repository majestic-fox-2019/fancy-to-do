const Model = require('../models')
const Todo = Model.Todo
const jwt = require('jsonwebtoken')


class ControllerTodo {

  static create(req, res, next) {
    let body = req.body
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_RAHAYU)

    Todo
      .create({
        title: body.title,
        description: body.description,
        status: body.status,
        due_date: body.due_date,
        UserId: decode.id
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch((err) => {
        if (err.message != 0) {
          err.statusCode = '400'
        } else {
          err.statusCode = '500'
        }
        next(err)
      })
  }

  static findAll(req, res, next) {
    Todo
      .findAll()
      .then(result => {

        res.status(200).json(result)
      })
      .catch(err => {
        next(err)

      })
  }

  static findOne(req, res, next) {
    let id = req.params.id
    Todo
      .findOne({ where: { id: id } })
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          let err = {
            statusCode: '404',
            message: 'Not Found'
          }
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateAll(req, res, next) {
    let id = req.params.id
    let { title, description, status, due_date } = req.body
    Todo
      .update({ title, description, status, due_date }, { where: { id: id }, returning: true })
      .then(result => {

        if (result[0] == 1) {
          res.status(200).json(result[1][0])
        } else {
          let err = {
            statusCode: '404',
            message: 'Not Found'
          }
          next(err)
        }
      })
      .catch(err => {
        if (err.message != 0) {
          err.statusCode = '400'
        } else {
          err.statusCode = '500'
        }
        next(err)
      })
  }

  static delete(req, res, next) {
    let id = req.params.id
    let isi = null
    Todo
      .findOne({ where: { id: id } })
      .then(result => {
        isi = result
        return Todo.destroy({ where: { id: id }, returning: true })
      })
      .then(resultDestroy => {
        if (resultDestroy > 0) {
          res.status(200).json(isi)
        } else {
          let err = {
            statusCode: '404',
            message: 'Not Found'
          }
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = ControllerTodo