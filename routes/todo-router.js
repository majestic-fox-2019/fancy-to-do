"use strict";

const todoRouter = require("express").Router();
const { TodoController } = require("../controllers/todo-controller");

todoRouter.get("/", TodoController.findAll);
todoRouter.post("/", TodoController.create);
todoRouter.get("/:id", TodoController.findOne);
todoRouter.put("/:id", TodoController.update);
todoRouter.delete("/:id", TodoController.destroy);

module.exports = {
  todoRouter
};