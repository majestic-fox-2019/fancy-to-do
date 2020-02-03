const Index = require('../models/index')
const Task = Index.Task

class TaskController {

  static add(req, res, next){
    let addTask = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    
    Task.create(addTask)
    .then(result => {
      let response = {
        statusCode: 201,
        response: result
      }
      next(response)
    })
    .catch(err => {
      let errorMessage = {
        statusCode: 400,
        response: err.errors[0].type
      }
      next(errorMessage)
      })

  }

}

module.exports = TaskController