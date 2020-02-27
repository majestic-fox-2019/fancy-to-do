const bcrypt = require('bcrypt')
function matchPassword(passwordIn, passwordDB) {
    const match = bcrypt.compareSync(passwordIn, passwordDB)
    return match
}

module.exports = matchPassword