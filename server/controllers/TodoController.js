const { Todo } = require('../models')
const helper = require('../helpers/helper')

class TodoController {
  static getTodolist(req, res, next){
    Todo.findAll({
      where: {
        UserId: req.user.id
      },
      order: [['id', 'DESC']]
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
  }

  static createTodolist(req, res, next){
    const addTodo = {
      title: req.body.title,
      description: req.body.description,
      status: 0,
      due_date: req.body.due_date,
      UserId: req.user.id
    }

    Todo.create(addTodo)
      .then(result => {
        helper.sendMail(req.user.email, result.title, result.description, result.due_date)
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static detailTodo(req, res, next){
    const id_todo = Number(req.params.id)

    Todo.findByPk(id_todo)
    .then(result => {
      if(result){
        res.status(200).json(result)
      }else{
        next({
          statusCode: 404,
          message: "Todo not found"
        })
      }
    })
    .catch(err => {
      next(err)
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

    Todo.findByPk(id_todo)
      .then(result => {
        if(result){
          return result.update(updateTodo, { returning : true })
        }else{
          throw {
            statusCode: 404,
            message: "Todo not found"
          }
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
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
          throw {
            statusCode: 404,
            message: "Todo not found"
          }
        }
      })
      .then(() => {
        res.status(200).json(dataDelete)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodoController