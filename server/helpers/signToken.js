const jwt = require("jsonwebtoken");

function signToken(payload) {
	return jwt.sign(payload, process.env.SECRET_TOKEN);
}

module.exports = signToken;
