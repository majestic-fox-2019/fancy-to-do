const { Todo } = require('../models')
const validasiError = require('../helper/validasiErrorMessage')

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

    Todo.create(addTodo)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(400).json(validasiError(err.errors))
      })
  }

  static detailTodo(req, res, next){
    const id_todo = Number(req.params.id)

    Todo.findByPk(id_todo)
    .then(result => {
      if(result){
        res.status(200).json(result)
      }else{
        throw { message: 'Error not found' }
      }
    })
    .catch(err => {
      res.status(404).json(err)
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
      where : { id : id_todo }, returning : true
    })
      .then(result => {
        let dataUpdate = null
        if (result[0] !== 0) {
          dataUpdate = result[1][0]
          res.status(200).json(dataUpdate)
        } else {
          res.status(404).json({
            message: 'Error Not Found'
          })
        }
      })
      .catch(err => {
        res.status(400).json(validasiError(err.errors))
      })
  }

  static destroyTodolist(req, res, next){
    const id_todo = Number(req.params.id)
    let dataDelete
    Todo.findByPk(id_todo)
      .then(result => {
        if(result){
          dataDelete = result
          return result.destroy()
        }else{
          throw { message: 'Error not found' }
        }
      })
      .then(() => {
        res.status(200).json(dataDelete)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }
}

module.exports = TodoController