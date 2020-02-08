const Helper = require('../helper/helper')

module.exports = (err, req, res, next) => {
    switch (err.name) {
        case 'SequelizeValidationError':
            res.status(400).json({
                message : Helper.errorFormatter(err.errors)
            })
            break;
        case 'JsonWebTokenError':
            res.status(403).json({
                message : err.message
            })
        case 'SequelizeConnectionError':
            res.status(500).json({
                message : 'Internal Server Error'
            })
            break;
        case 'SequelizeDatabaseError':
            res.status(500).json({
                message : 'Internal Server Error'
            })
            break;

        default:
            if(err.status){
                res.status(err.status).json({
                    message : err.message
                })
            }else{
                res.status(500).json({
                    message : 'Internal Server Error'
                })
            }
            break;
    }
}