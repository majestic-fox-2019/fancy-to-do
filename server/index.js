"use strict";

const express = require('express');
const app = express();
const port = 3000;
const { indexRouter } = require("./routes/index-router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});