const { Todo } = require('../models')

class TodoController {
  static getTodolist(req, res, next){
    Todo.findAll()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
  }

  static createTodolist(req, res, next){
    const addTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todos.create(addTodo)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  }

  static detailTodo(req, res, next){
    const id_todo = Number(req.params.id)

    Todo.findByPk({
      where: { id : id_todo}
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
  }

  static updateTodolist(req, res, next){
    const updateTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    const id_todo = Number(req.params.id)

    Todo.update(updateTodo, {
      where : { id : id_todo }
    })
      .then(result => {
        if (result[0] === 0) {
          throw new Error("Update data fail nih, iseng ah")
        } else {
          res.status(200).json(result)
        }
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  }

  static destroyTodolist(req, res, next){
    const id_todo = Number(req.params.id)

    Todo.destroy(id_todo)
      .then(result => {
        res.json({
          statusCode: 200,
          message: 'Delete successful',
          payload: result
        })
      })
      .catch(err => {
        throw {
          statusCode: 400,
          message: 'Delete failed!'
        }
      })
  }
}

module.exports = TodoController