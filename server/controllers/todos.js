const { Todo } = require('../models/index')
const { Op } = require('sequelize').Sequelize
const createError = require('http-errors')
const addTodoTemplate = require('../helper/successAddTodoTemplate')
const updateTodoTempate = require('../helper/successfullyUpdatedTodoTemplate')
const mailSender = require('../helper/mailSender')


class TodoController {

  static find(req, res, next) {
    const title = req.query.title
    let parameter

    if (!title) {
      parameter = {
        where: {
          UserId: req.user.id
        }
      }
    } else {
      parameter = {
        where: {
          UserId: req.user.id,
          title: {
            [Op.like]: `%${title}%`
          }
        }
      }
    }

    Todo
      .findAll(parameter)
      .then(result => {
        if (result.length > 0) {
          res.status(200).json(result)
        } else {
          throw createError(200, { message: { error: 'Not Found!' } })
        }
      })
      .catch(next)
  }

  static create(req, res, next) {
    let objValue = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.user.id
    }

    Todo
      .create(objValue)
      .then(result => {
        res.status(201).json(result)
        console.log(result.title)
        mailSender(req.user.email, req.user.name, 'Successfully Added New Todo', addTodoTemplate(req.user.name, result.title, result.due_date))
      })
      .catch(next)
  }

  static findById(req, res, next) {
    Todo
      .findByPk(req.params.id)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let objValue = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo
      .update(objValue, {
        where: {
          id: req.params.id,
        },
        returning: true
      })
      .then(response => {
        if (response[0] > 0) {
          res.status(200).json(response[1][0])
          mailSender(req.user.email, req.user.name, 'Successfully Updated Todo', updateTodoTempate(req.user.name, response[1][0]))
        } else {
          throw createError(404, { message: { error: 'Not Found' } })
        }
      })
      .catch(next)
  }

  static destroy(req, res, next) {
    let data = {}

    Todo
      .findByPk(req.params.id)
      .then(response => {
        data = response
        return Todo.destroy({
          where: {
            id: req.params.id
          }
        })
      })
      .then(response => {
        if (data === null) {
          throw createError(404, { message: { error: 'Not Found' } })
        } else {
          res.status(200).json(data)
        }
      })
      .catch(next)
  }

}

module.exports = TodoController