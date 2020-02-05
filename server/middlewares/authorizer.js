const {tokenVerifier} = require('../helpers/jwt');

module.exports =(req,res,next) => {
    try{
        let user = tokenVerifier(req.headers.token)
        req.user = user
        console.log('req.user : ')
        console.log(req.user)
        next()
    } catch(err){
        next('invalid-token')
    }
};
