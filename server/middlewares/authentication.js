const jwt = require("jsonwebtoken");
const {User} = require("../models");

function authentication(req, res, next) {
	try {
		const token = req.headers.token;
		const data = jwt.verify(token, process.env.SECRET_TOKEN);
		req.LoggedId = data.id;
		req.LoggedEmail = data.email;
		User.findByPk(data.id)
		.then(data => {
			if(!data) {
				next({name: "UserNotFound"});
			} else {
				next();
			}
		})
		.catch(err => {
			throw ({name:"UserNotFound"})
		})
	} catch(err) {
		next(err)
	}
}

module.exports = authentication;
