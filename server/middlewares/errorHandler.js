const errorHelpers = require('../helpers/errorHelper');

function errorHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const status = errorHelpers(err)
  // res.status(err.status || 500);
  res.status(status);
  res.json(res.locals);
}

module.exports = errorHandler;