function errorHandler(obj) {
	if (obj.name == "UserNotFound") {
		obj.status = 404;
		obj.message = "User Not Found!";
	} else if (obj.name == "DataNotFound") {
		obj.status = 404;
		obj.message = "Data Not Found!";
	} else if (obj.name == "SequelizeValidationError") {
		obj.status = 400;
	} else if (obj.name == "TokenExpiredError") {
		obj.status = 400;
		obj.message = "Token is Expired!"
	} else if (obj.name == "JsonWebTokenError") {
		obj.status = 400;
		obj.message = "Token is not Valid!";
	} else if (obj.name == "Forbidden") {
		obj.status = 403;
		obj.message = "Data is Forbidden for this User!";
	} else {
		obj.status = 500;
		obj.message = "Server Error";
	}
	return obj;
}

module.exports = errorHandler;
