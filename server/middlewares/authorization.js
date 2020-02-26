const {findTodoUserId} = require('./../helpers/authorization')

function authorization(req, res, next){
    findTodoUserId(req.params.id)
        .then(idUser => {
            if (idUser === req.user.id) {
                next();
            }else{
                throw {
                    statusCode: 403,
                    message: "You are not authorized to do the action!"
                }
            }
        })
        .catch(err => {
            next(err);
        })
}

module.exports = authorization