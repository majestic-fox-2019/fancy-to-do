const { User } = require("../models");
const dehashPassword = require("../helpers/dehashPassword");
const signToken = require("../helpers/signToken");

class Controller {
	static register(req, res, next) {
		const obj = {
			email: req.body.email,
			password: req.body.password
		};
		User.create(obj)
			.then(data => {
				res.status(201).json(data);
			})
			.catch(next)
	}
	static signInGoogle(req, res, next) {
		const email = req.body.email;
		const password = process.env.GOOGLE_PASSWORD;
		const where = {
			where: {
				email: email
			}
		}
		User.findOne(where)
			.then(data => {
				if (!data) {
					const obj = {
						email: email,
						password: password
					}
					return User.create(obj);
				} else {
					const obj = {
						id: data.id,
						email: data.email
					};
					const token = signToken(obj);
					res.status(200).json({ token });
				}
			})
			.then(data => {
				const obj = {
					id: data.id,
					email: data.email
				};
				const token = signToken(obj);
				res.status(200).json({ token });
			})
			.catch(next);
	}
	static login(req, res, next) {
		const email = req.body.email;
		const password = req.body.password;
		const error = [];
		if (!email || email == "") {
			error.push({ message: "Please fill `Email`" });
		}
		if (!password || password == "") {
			error.push({ message: "Please fill `Password`" });
		}
		if (error.length > 0) {
			next({ name: "SequelizeValidationError", errors: error });
		}
		const where = {
			where: {
				email: email
			}
		}
		User.findOne(where)
			.then(data => {
				if (!data) {
					throw ({ name: "UserNotFound" });
				} else {
					const isValid = dehashPassword(password, data.password);
					if (isValid) {
						const obj = {
							id: data.id,
							email: data.email
						};
						const token = signToken(obj);
						res.status(200).json({ token });
					} else {
						throw ({ name: "UserNotFound" });
					}
				}
			})
			.catch(err => {
				next(err);
			});
	}
}

module.exports = Controller;
