const errorHandler = require("../helpers/errorHandler");

function error(err, req, res, next) {
	const newErr = errorHandler(err);
	res.status(newErr.status).json(newErr);
}       

module.exports = error;
