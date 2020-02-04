const bcrypt = require('bcrypt');

module.exports = {
  hashPassword: function (password) {
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  comparePassword: function (password, hashedPassword) {
    const isValid = bcrypt.compareSync(password, hashedPassword);
    return isValid;
  }
};
