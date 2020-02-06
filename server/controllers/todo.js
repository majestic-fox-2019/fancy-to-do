const { Todo } = require("../models");
const sendEmail = require("../helpers/sendEmail");
class Controller {
	static findOne(req, res, next) {
		const id = req.params.id;
		const where = {
			where: {
				id: id
			}
		};
		Todo.findOne(where)
			.then(data => {
				console.log(data);
				if (!data) {
					next({ name: "DataNotFound" });
				} else {
					res.status(200).json(data)
				}
			})
			.catch(err => {
				next(err);
			});
	}
	static findAll(req, res, next) {
		const id = req.LoggedId;
		const where = {
			where: {
				UserId: id
			},
			order: [["id", "ASC"]]
		};
		Todo.findAll(where)
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				next(err);
			});
	}
	static create(req, res, next) {
		const obj = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date,
			UserId: req.LoggedId
		};
		const email = req.LoggedEmail;
		Todo.create(obj)
			.then(data => {
				sendEmail(email, data.title, data.description);
				res.status(201).json(data);
			})
			.catch(err => {
				next(err);
			});
	}
	static update(req, res, next) {
		const id = req.params.id;
		const obj = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date,
			UserId: req.LoggedId
		};
		const where = {
			where: {
				id: id
			},
			returning: true
		};
		Todo.update(obj, where)
			.then(data => {
				if (data[0] == 0) {
					next({ name: "DataNotFound" });
				} else {
					res.status(200).json(data[1]);
				}
			})
			.catch(err => {
				next(err);
			});
	}
	static destroy(req, res, next) {
		const id = req.params.id;
		const where = {
			where: {
				id: id
			}
		};
		Promise.all([Todo.findByPk(id), Todo.destroy(where)])
			.then(data => {
				if (data[1] == 0) {
					next({ name: "DataNotFound" })
				} else {
					res.status(200).json(data[0]);
				}
			})
			.catch(err => {
				next(err);
			});
	}
}

module.exports = Controller;
