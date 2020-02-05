const jwt = require("jsonwebtoken");
const { Todo } = require("../models");

function authorization(req, res, next) {
	const todoId = req.params.id;
	const userId = req.LoggedId;
	Todo.findByPk(todoId)
		.then(data => {
			if (!data) {
				next({ name: "DataNotFound" })
			} else {
				if (data.UserId != userId) {
					next({ name: "Forbidden" });
				} else {
					next();
				}
			}
		})
		.catch(next)
}

module.exports = authorization;
