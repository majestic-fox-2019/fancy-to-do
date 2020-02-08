const { Todo } = require("../models");
const errorMaker = require("../helpers/errMessageMaker");
class todoController {
  static getAll(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.user.id
      },
      order: [["id", "ASC"]]
    })
      .then(data => {
        res.status(201).json({
          message: "success",
          result: data
        });
      })
      .catch(err => {
        res.send(err);
      });
  }
  static createOne(req, res, next) {
    const objInput = {
      Title: req.body.title,
      Description: req.body.description,
      Status: req.body.status,
      Due_date: req.body.due_date,
      UserId: req.user.id
    };
    Todo.create(objInput)
      .then(result => {
        res.status(201).json({
          message: "success",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        let objError = {
          // statusError: 400,
          // message: errorMaker(err)
        };
        next(objError);
      });
  }
  static findOne(req, res, next) {
    const id = req.params.id;
    Todo.findOne({
      where: {
        id: id,
        UserId: req.user.id
      }
    }).then(data => {
      if (data) {
        res.status(200).json({
          data
        });
      } else {
        let err = {
          statusError: 404,
          message: "error not found"
        };
        next(err);
      }
    });
  }
  static updates(req, res, next) {
    const objInput = {
      Title: req.body.title,
      Description: req.body.description,
      Status: req.body.status,
      Due_date: req.body.due_date
    };
    Todo.update(objInput, {
      where: {
        id: Number(req.params.id),
        UserId: req.user.id
      },
      returning: true
      // plain : true
    })
      .then(data => {
        console.log(data);
        if (data[0] > 0) {
          console.log(data[0]);
          res.status(200).json({
            message: "success",
            result: data[1]
          });
        } else {
          let err = {
            statusError: 404,
            message: "data not found"
          };
          next(err);
        }
      })
      .catch(err => {
        let objError = {
          statusError: 400,
          message: errorMaker(err)
        };
        next(objError);
      });
  }
  static delete(req, res, next) {
    const id = req.params.id;
    var objResult;
    Todo.findByPk(id)
      .then(data => {
        objResult = data;
        return Todo.destroy({
          where: {
            id: req.params.id,
            UserId: req.user.id
          }
        });
      })
      .then(data => {
        if (data > 0) {
          res.status(200).json({
            message: "success",
            result: objResult
          });
        } else {
          let err = {
            statusError: 404,
            message: "error not found"
          };
          next(err);
        }
      });
  }
}
module.exports = todoController;
