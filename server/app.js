if (process.env.NODE_ENV === "development") {
  console.log(`"${process.env.NODE_ENV}"`);
  require('dotenv').config();
}

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// logErrors
app.use(function (err, req, res, next) {
  console.error(err)
  console.log(err.message);
  next(err)
});
// // clientErrorHandler
// app.use(function (err, req, res, next) {
//   if (req.xhr) {
//     res.status(500).send({ error: 'Something failed!' })
//   } else {
//     next(err)
//   }
// });
// errorHandler
// app.use(function (err, req, res, next) {
//   res.status(500)
//   // res.render('error', { error: err })
//   res.json({error: err});
// });
app.use(errorHandler);

module.exports = app;
