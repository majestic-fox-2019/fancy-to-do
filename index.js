"use strict";

const express = require('express');
const app = express();
const port = 3000;
const { todoRouter } = require("./routes/todo-router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todos", todoRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});