const { Todo } = require("../models");

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
				if (!data) {
					next({ name: "NotFound" });
				} else {
					res.status(200).json(data)
				}
			})
			.catch(err => {
				next(err);
			});
	}
	static findAll(req, res, next) {
		Todo.findAll()
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
			due_date: req.body.due_date
		};
		Todo.create(obj)
			.then(data => {
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
			due_date: req.body.due_date
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
					next({ name: "NotFound" });
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
					next({ name: "NotFound" })
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
