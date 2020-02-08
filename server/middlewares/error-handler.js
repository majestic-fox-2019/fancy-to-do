"use strict";

module.exports = (err, req, res, next) => {
  if (err) {
    switch (err.status) {
      case 401:
        res.status(err.status).json({
          message: "YOU ARE NOT AUTHORIZED!"
        });
        break;

      case 404 && typeof err.message != "undefined":
        res.status(err.status).json({
          message: "NOTHING'S FOUND!"
        });
        break;

      case 500:
        res.status(err.status).json({
          message: "INTERNAL SERVER ERROR!"
        });
        break;

      default:
        // res.status(err.status).json({
        //   message: err.message
        // });
        break;
    }
  }
  else {
    next();
  }
};