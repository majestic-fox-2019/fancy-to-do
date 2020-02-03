const { Todo } = require('../models');

class todoController {
  // create
  static create(req, res, next) {
    const todoForm = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.create(todoForm)
      .then((result) => {
        res.status(201);
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
  // find all
  static findAll(req, res, next) {
    Todo.findAll()
      .then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
  // find one
  static findOne(req, res, next) {
    const { id } = req.params;
    Todo.findOne({
      where: {
        id
      }
    })
      .then((result) => {
        if (result) {
          res.status(200);
          res.json(result);
        }
        else {
          const err = new Error("Not Found");
          err.status = 404;
          throw err;
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  // update by id
  static updateById(req, res, next) {
    const { id } = req.params;
    const todoUpdate = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(todoUpdate, {
      where: {
        id
      }
    })
      .then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        next(err)
      });
  }
  // delete by id
  static deleteById(req, res, next) {
    const { id } = req.params;
    Todo.destroy({
      where: {
        id
      }
    })
      .then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        next(err)
      });
  }
}

module.exports = todoController;