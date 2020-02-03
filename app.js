const express = require("express");
const app = express();
const port = 3000;
const createError = require("http-errors");
const Routers = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", Routers);

app.use(function (err, req, res, next) {
	if (err) {
		if (err.name == "SequelizeValidationError") {
			res.status(400).json(err);
		} else if (err.name == "NotFound") {
			err.msg = "Error not found!"
			res.status(404).json(err)
		} else {
			next();
		}
	}
});
app.use(function (err, req, res, next) {
	if (err) {
		res.status(500);
	}
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
