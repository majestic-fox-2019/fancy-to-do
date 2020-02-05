const bcrypt = require('bcrypt');
const saltRounds = 8

function hasher(password){
    console.log('entered bcrypt hasher')
    return bcrypt.hashSync(password,saltRounds)
}

function comparer(password, hashed){
    console.log('entered bcrypt comparer')
    return bcrypt.compareSync(password, hashed)
}

module.exports = {
    hasher,
    comparer    
};
