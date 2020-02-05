const jwt = require('jsonwebtoken');

function tokenSigner(payload){
    console.log('Entered tokenSigner')
    let token = jwt.sign(payload,process.env.JWT_SECRET)
    console.log('token : '+token)
    return token
}

function tokenVerifier(token){
    console.log('entered tokenVerifier')
    let user = jwt.verify(token,process.env.JWT_SECRET)
    console.log('user from token : '+user)
    return user
}

module.exports = {
    tokenSigner,
    tokenVerifier
};
