function errorHandler(obj) {
	console.log(obj);
	if (obj.name == "UserNotFound") {
		obj.status = 404;
		obj.custom_message = "User Not Found!";
	} else if (obj.name == "DataNotFound") {
		obj.status = 404;
		obj.custom_message = "Data Not Found!";
	} else if (obj.name == "SequelizeValidationError") {
		const error = [];
		obj.errors.forEach(el => {
			error.push(el.message);
		});
		obj.status = 400;
		obj.custom_message = error;
	} else if (obj.name == "TokenExpiredError") {
		obj.status = 400;
		obj.custom_message = "Token is Expired!"
	} else if (obj.name == "JsonWebTokenError") {
		obj.status = 400;
		obj.custom_message = "Token is not Valid!";
	} else if (obj.name == "Forbidden") {
		obj.status = 403;
		obj.custom_message = "Data is Forbidden for this User!";
	} else {
		obj.status = 500;
		obj.custom_message = "Server Error";
	}
	return obj;
}

module.exports = errorHandler;
