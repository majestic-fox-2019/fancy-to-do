const { Todo } = require('../models')

class TodoController {
  static getTodolist(req, res, next){
    Todo.findAll()
    .then(result => {
      res.json({
        statusCode: 200,
        message: 'Get data successful',
        payload: result
      })
    })
    .catch(err => {
      throw {
        statusCode : 404,
        message : 'Get data error!'
      }
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
        res.json({
          statusCode: 201,
          message: 'Create successful',
          payload: result
        })
      })
      .catch(err => {
        console.log(err)
        if(err.message === 'Title must be filled'){
          throw {
            statusCode: 400,
            message: 'Add todolist failed! Title must be filled'
          }  
        }else if(err.message === 'Description must be filled'){
          throw {
            statusCode: 400,
            message: 'Add todolist failed! Description must be filled'
          }
        }else{
          next(err)
        }
      })
  }

  static detailTodo(req, res, next){
    const id_todo = Number(req.params.id)

    Todo.findByPk({
      where: { id : id_todo}
    })
    .then(result => {
      res.json({
        statusCode: 200,
        message: 'Get detail data successful',
        payload: result
      })
    })
    .catch(err => {
      throw {
        statusCode: 404,
        message: 'Get detail data failed!'
      }
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
        res.json({
          statusCode: 200,
          message: 'Update data successful',
          payload: updateTodo
        })
      })
      .catch(err => {
        throw {
          statusCode: 404,
          message: 'Update data failed!'
        }
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