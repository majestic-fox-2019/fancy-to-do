const bcrypt = require('bcrypt');
module.exports = {
  hashing : function hashing (pass){
    return bcrypt.hashSync(pass, 10);
  },
  compare : function compare (base, pass){
    return bcrypt.compareSync(pass, base)
  }
}