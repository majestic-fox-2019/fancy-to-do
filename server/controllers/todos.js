const {Todo} = require("../models")
const createError = require('http-errors')
const sequelize = require('sequelize')
class TodosController{
  static create(req,res,next){
    const {title, description, status, due_date} = req.body
    const UserId = req.user.id
    Todo
      .create({title, description, status, due_date, UserId})
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
      where : {
        UserId: req.user.id, 
      },
      order: [
          [sequelize.literal(`CASE status
                WHEN 'incomplete' THEN 1
                ELSE 2
            END`)],
          ["due_date","ASC"]
        ]
    })
    .then(todos => {
      res
        .status(200)
        .json(todos)
    })
    .catch(next)
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
          throw createError(404,"todo not found")
        }
      })
      .catch(next)
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
          throw createError(404,"todo not found")
        } 
      })
      .then(todo => {
        res
          .status(200)
          .json(todo)
      })
      .catch(next)
  }

  static delete(req,res,next){
    const id = req.params.id
    let deleted = null
    Todo
      .findByPk(id)
      .then(todo => {
        if (todo){
          deleted = todo
          return todo.destroy()
        }else{
          throw createError(404,"todo not found")
        } 
      })
      .then(todo => {
        res
          .status(200)
          .json(deleted)
      })
      .catch(next)
  }
}

module.exports = TodosController