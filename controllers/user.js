const {User} = require("../models");
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
	static login(req, res, next) {
		const email = req.body.email;
		const password = req.body.password;
		const where = {
			where: {
				email: email
			}
		}
		User.findOne(where)
		.then(data => {
			console.log(data);
			const isValid = dehashPassword(password, data.password);
			if(isValid) {
				const obj = {
					id: data.id
				};
				const token = signToken(obj);
				res.status(200).json({token});
			} else {
				next({name:"UserNotFound"})
			}
		})
		.catch(next);
	}
}

module.exports = Controller;
