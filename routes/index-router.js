"use strict";

const indexRouter = require("express").Router();
const { todoRouter } = require("./todo-router");
const { userRouter } = require("./user-router");
const authenticate = require("../middlewares/authenticate");

indexRouter.use("/", userRouter);

indexRouter.use(authenticate);

indexRouter.use("/todos", todoRouter);

module.exports = {
  indexRouter
};