const {Todo} = require("../models")
const responseApi = require("../helper/format").responseApi
class TodosController{
  static create(req,res,next){
    const {title, description, status, due_date} = req.body

    Todo
      .create({title, description, status, due_date})
      .then(todo => {
        res
          .status(201)
          .json(responseApi(todo,"Success create todo"))
      })
      .catch(err => {
        next(err)
      })
  }

  static findAll(req,res,next){
    Todo
      .findAll()
      .then(todos => {
        res
          .status(200)
          .json(responseApi(todos))
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
            .json(responseApi(todo))
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
          .json(responseApi(todo,"Success update todo"))
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
          next({
            statusCode : 404,
            message : "todo not found"
          })
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