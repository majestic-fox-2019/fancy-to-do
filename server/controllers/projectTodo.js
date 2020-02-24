const { Todo } = require('../models')
class Controller {
  static create(req, res, next) {
    let newProjectTodo = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      UserId: req.userInfo.id,
      ProjectId: req.params.id
    }
    Todo.create(newProjectTodo)
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
        ProjectId: req.params.id
      }
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller
