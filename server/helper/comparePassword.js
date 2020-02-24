const bcrypt = require('bcryptjs')

function compare(password, response_password){
    return bcrypt.compareSync(password, response_password)
}

module.exports = compare