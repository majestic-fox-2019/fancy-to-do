"use strict";

const { Todo } = require("../models");

class TodoController {
  static findAll(req, res, next) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static create(req, res, next) {
    const todoData = {
      title: req.body.title,
      description: req.body.status,
      status: req.body.status,
      due_date: req.body.due_date
    };

    Todo.create(todoData)
      .then(todos => {
        res.status(201).json(todos);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findOne(req, res, next) {
    Todo.findByPk(req.params.id)
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static update(req, res, next) {
    const todoData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.description,
      due_date: req.body.due_date
    };

    Todo.update(todoData, { where: { id: req.params.id } })
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static destroy(req, res, next) {
    Todo.destroy({ where: { id: req.params.id } })
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        console.log(err);
      });
  }
}


module.exports = {
  TodoController
};