const {Todo,User} = require("../models")
class TodosController{
  static create(req,res,next){
    const {title, description, status, due_date} = req.body
    const UserId = req.user.id
    Todo
      .create({title, description, status, due_date,UserId})
      .then(todo => {
        res
          .status(201)
          .json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static findAll(req,res,next){
    Todo
      .findAll({
        include : [{model:User}],
        where : {
          UserId: req.user.id
        }
      })
      .then(todos => {
        res
          .status(200)
          .json(todos)
      })
      .catch(err => {
        next(err)
      })
  }

  static findById(req,res,next){
    const id = req.params.id
    Todo
      .findByPk(id)
      .then(todo => {
        if (todo){
          res
            .status(200)
            .json(todo)
        }else{
          next({
            statusCode : 404,
            message : "todo not found"
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req,res,next){
    const id = req.params.id
    const opt = {
      returning : true
    }
    const {title, description, status, due_date} = req.body
    Todo
      .findByPk(id)
      .then(todo => {
        if (todo){
          return todo
                  .update({title, description, status, due_date},opt)
        }else{
          throw {
            statusCode : 404,
            message : "todo not found"
          }
        } 
      })
      .then(todo => {
        res
          .status(200)
          .json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req,res,next){
    const id = req.params.id
    let deleted = null
    Todo
      .findByPk(id)
      .then(todo => {
        if (todo){
          deleted = todo
          return todo
                  .destroy()
        }else{
          throw {
            statusCode : 404,
            message : "todo not found"
          }
        } 
      })
      .then(todo => {
        res
          .status(200)
          .json(responseApi(deleted,"Success delete todo"))
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodosController