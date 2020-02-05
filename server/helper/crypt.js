const bcrypt = require('bcrypt')
const saltRounds = 5;

class Password {
  static hash(textplaint) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(textplaint, salt, function (err, hash) {
          resolve(hash)
        });
      });
    })
  }

  static compare(textplaint, hashed) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(textplaint, hashed, function (err, res) {
        resolve(res)
      });
    })
  }
}


module.exports = Password