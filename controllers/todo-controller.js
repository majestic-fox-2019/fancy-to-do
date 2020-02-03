"use strict";

const { Todo } = require("../models");

class TodoController {
  static findAll(req, res, next) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        const errObj = {
          statusCode: 500,
          message: "Internal Server Error!"
        }
        next(errObj);
      });
  }

  static create(req, res, next) {
    const todoData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    };

    Todo.create(todoData)
      .then(todos => {
        res.status(201).json(todos);
      })
      .catch(err => {
        if (err.message.includes("Validation error:")) {
          const errObj = {
            statusCode: 400,
            messages: err.message
          };
          next(errObj);
        }
        else {
          const errObj = {
            statusCode: 500,
            message: "Internal Server Error!"
          };
          next(errObj);
        }
      });
  }

  static findOne(req, res, next) {
    Todo.findByPk(req.params.id)
      .then(todos => {
        if (todos == null) {
          const errObj = {
            statusCode: 404,
            message: "Error! Not found."
          };
          next(errObj);
        }
        else {
          res.status(200).json(todos);
        }
      })
      .catch(err => {
        const errObj = {
          statusCode: 500,
          message: "Internal Server Error!"
        };
        next(errObj);
      });
  }

  static update(req, res, next) {
    const todoData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      updatedAt: Date.now()
    };

    Todo.update(todoData, { where: { id: req.params.id } })
      .then(todo => {
        if (todo.includes(0)) {
          const errObj = {
            statusCode: 404,
            message: "Error! Not found"
          };
          next(errObj);
        }
        else {
          return Todo.findByPk(req.params.id);
        }
      })
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        if (err.message.includes("Validation error:")) {
          const errObj = {
            statusCode: 400,
            message: err.message
          };
          next(errObj);
        } else {
          res.send(err);
          console.log(err);
          const errObj = {
            statusCode: 500,
            message: "Internal Server Error!"
          };
          next(errObj);
        }
      });
  }

  static destroy(req, res, next) {
    let deletedTodo = null;

    Todo.findByPk(req.params.id)
      .then(todo => {
        if (todo == null) {
          const errObj = {
            statusCode: 404,
            message: "Error! Not found"
          };
        }
        else {
          deletedTodo = todo;
          return Todo.destroy({
            where: {
              id: req.params.id
            }
          });
        }
      })
      .then(todo => {
        if (todo == null) {
          const errObj = {
            statusCode: 404,
            message: "Error! Not found"
          };
          throw errObj;
        }
        else {
          res.status(200).json(deletedTodo);
        }
      })
      .catch(err => {
        if (err.statusCode == 404) {
          next(err);
        }
        else {
          const errObj = {
            statusCode: 500,
            message: "Internal Server Error!"
          };
          next(errObj);
        }
      });
  }
}


module.exports = {
  TodoController
};