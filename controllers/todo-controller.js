"use strict";

if (process.env.NODE_ENV == 'development') {
  require("dotenv").config();
}

const { Todo } = require("../models");
const createError = require("http-errors");
const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

class TodoController {
  static findAll(req, res, next) {
    Todo.findAll({ where: { id: req.user.id } })
      .then(todos => {
        if (!todos) {
          throw createError(404, "There are no tasks!");
        }
        else {
          res.status(200).json(todos);
        }
      })
      .catch(err => {
        if (err.status != 500) {
          res.status(err.status).json(err);
        }
        else {
          res.status(500).json({ message: "Internal server error!" });
        }
      });
  }

  static create(req, res, next) {
    const todoData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.user.id
    };

    let createdTodo = null;

    Todo.create(todoData)
      .then(todo => {
        // MAILJET
        createdTodo = todo;
        return mailjet.post("send", {
          version: "v3.1"
        }).request({
          Messages: [{
            From: {
              Email: "rafiandria23@gmail.com",
              Name: "Fancy Todo"
            },
            To: [{
              Email: `${req.user.email}`,
              Name: `${req.user.email}`
            }],
            Subject: `Fancy Todo - ${todoData.title}`,
            TextPart: `Fancy Todo - ${todoData.title}`,
            HTMLPart: `
            <h3>Dear, ${req.user.email}. Thank you for using Fancy Todo!</h3>
            <p>You have just created <b>${todoData.title}</b> with <b>${todoData.description}</b> due on <b>
            ${Date(todoData.due_date)}</b></p>
            `
          }]
        });
      })
      .then(result => {
        res.status(201).json(createdTodo);
      })
      .catch(err => {
        console.log(err);
        if (err.message.includes("Validation error:")) {
          res.status(401).json({ message: err.message });
        }
        else {
          res.status(500).json({ message: "Internal server error!" });
        }
      });
  }

  static findOne(req, res, next) {
    Todo.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      .then(todos => {
        if (!todos) {
          throw createError(404, "No task found!");
        }
        else {
          res.status(200).json(todos);
        }
      })
      .catch(err => {
        if (err.status != 500) {
          res.status(err.status).json(err.message);
        }
        else {
          res.status(500).json({ message: "Internal server error!" });
        }
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

    Todo.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    })
      .then(todo => {
        if (!todo) {
          throw createError(404, "No task found!");
        }
        else {
          return Todo.update(todoData, {
            where: {
              id: req.params.id,
              UserId: req.user.id
            }
          });
        }
      })
      .then(todo => {
          return Todo.findOne({
            where: {
              id: req.params.id,
              UserId: req.user.id
            }
          });
      })
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        if (typeof err.message != "undefined" && err.message.includes("Validation error:")) {
          res.status(400).json({ message: err.message });
        }
        else if (err.status != 500) {
          res.status(err.status).json(err);
        }
        else {
          res.status(500).json({ message: "Internal server error!" });
        }
      });
  }

  static destroy(req, res, next) {
    let deletedTodo = null;

    Todo.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      .then(todo => {
        if (!todo) {
          throw createError(404, "No task found!");
        }
        else {
          deletedTodo = todo;
          return Todo.destroy({
            where: {
              id: req.params.id,
              UserId: req.user.id
            }
          });
        }
      })
      .then(todo => {
        res.status(200).json(deletedTodo);
      })
      .catch(err => {
        if (err.status != 500) {
          res.status(err.status).json(err);
        }
        else {
          res.status(500).json({ message: "Internal server error!" });
        }
      });
  }
}

module.exports = {
  TodoController
};