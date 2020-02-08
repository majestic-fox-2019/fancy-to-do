const { Todo, User } = require('../models')
const Op = require('sequelize').Op
class ControllerTodo {
  static create(req, res, next) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      UserId: req.userInfo.id
    }
    Todo.create(todo)
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findAll(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.userInfo.id,
        ProjectId: null
      }
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findOne(req, res, next) {
    Todo.findOne({
      where: {
        [Op.and]: [
          {
            id: req.params.id
          },
          {
            UserId: req.userInfo.id
          }
        ]
      }
      //   include: [{ model: User }]
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    const value = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date
    }
    Todo.update(value, {
      where: {
        [Op.and]: [
          {
            id: req.params.id
          },
          {
            UserId: req.userInfo.id
          }
        ]
      },
      returning: true,
      plain: true
    })
      .then((result) => {
        res.status(200).json(result[1])
      })
      .catch((err) => {
        next(err)
      })
  }

  static patch(req, res, next) {
    let value = {
      status: req.body.status
    }
    Todo.update(value, {
      where: {
        [Op.and]: [
          {
            id: req.params.id
          },
          {
            UserId: req.userInfo.id
          }
        ]
      },
      returning: true,
      plain: true
    })
      .then((result) => {
        res.status(200).json(result[1])
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let todoData
    Todo.findOne({
      where: {
        [Op.and]: [
          {
            id: req.params.id
          },
          {
            UserId: req.userInfo.id
          }
        ]
      }
    })
      .then((todo) => {
        todoData = todo
        return Todo.destroy({
          where: {
            id: todo.id,
            UserId: req.userInfo.id
          }
        })
      })
      .then(() => {
        res.status(200).json(todoData)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = ControllerTodo
