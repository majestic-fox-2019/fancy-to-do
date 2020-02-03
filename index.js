"use strict";

const express = require('express');
const app = express();
const port = 3000;
const { todoRouter } = require("./routes/todo-router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todos", todoRouter);

app.use((err, req, res, next) => {
  if (err) {
    // res.status(err.statusCode).json(err);
    switch (err.statusCode) {
      case 404:
        err.message = "Error! Not Found.";
        res.status(err.statusCode).json(err);
        break;
      
      case 500:
        err.message = "Internal Server Error!";
        res.status(err.statusCode).json(err);
      break;
    
      default:
        res.status(err.statusCode).json(err);
        break;
    }
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});