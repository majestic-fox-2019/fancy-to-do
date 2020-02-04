const jwt = require('jsonwebtoken');

module.exports = {
  encryptToken(obj) {
    return jwt.sign(obj, process.env.JWT_SECRET);
  },
  decryptToken(token) {
    return jwt.decode(token);
  },
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};
