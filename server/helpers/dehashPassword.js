const bcrypt = require("bcrypt");

function dehashPassword(password, hashedPassword) {
	return bcrypt.compareSync(password, hashedPassword);
}

module.exports = dehashPassword;
