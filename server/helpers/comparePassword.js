const bcrypt = require('bcrypt')

module.exports = function (password, hashedPassword) {
    return new Promise ((resolve, rej) => {
        bcrypt.compare(password, hashedPassword, function(err, res) {
            if(err) {
                rej(err)
            } else {
                resolve(res)
            }
        })
    })
}