const { Todo } = require('../models');
const createError = require('http-errors');

class todoController {
  // create
  static create(req, res, next) {
    const todoForm = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.headers.user.id
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
    const {id: UserId} = req.headers.user;
    Todo.findAll({
      where: {
        UserId
      },
      order: [
        ["due_date"],
        ["createdAt"]
      ]
    })
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
          next(createError(404));
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
      },
      returning: true
    })
      .then((result) => {
        if (!result[0]) {
          next(createError(404));
        }
        res.status(200);
        res.json(result[1]);
      })
      .catch((err) => {
        next(err)
      });
  }
  // mark done
  static done(req, res, next) {
    const { id } = req.params;
    Todo.update({
      status: "done"
    }, {
      where: {
        id
      },
      returning: true
    })
      .then((result) => {
        if (!result[0]) {
          next(createError(404));
        }
        res.status(200);
        res.json(result[1]);
      })
      .catch((err) => {
        next(err)
      });
  }
  // mark undone
  static undone(req, res, next) {
    const { id } = req.params;
    Todo.update({
      status: "undone"
    }, {
      where: {
        id
      },
      returning: true
    })
      .then((result) => {
        if (!result[0]) {
          next(createError(404));
        }
        res.status(200);
        res.json(result[1]);
      })
      .catch((err) => {
        next(err)
      });
  }
  // delete by id
  static deleteById(req, res, next) {
    const { id } = req.params;
    let foundOne = null;
    Todo.findOne({
      where: {
        id
      }
    })
      .then((result) => {
        if (!result) {
          next(createError(404));
        }
        else {
          foundOne = result;
          return Todo.destroy({
            where: {
              id
            }
          })
        }
      })
      .then(() => {
        res.status(200);
        res.json(foundOne);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = todoController;