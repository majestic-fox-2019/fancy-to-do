const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = function (password) {
    return new Promise ((res, rej) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hashedPassword) {
                if(err) {
                    rej(err)
                } else {
                    res(hashedPassword)
                }
            })
        })
    })
}