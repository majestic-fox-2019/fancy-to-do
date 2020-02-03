function clientErrorHandler (err, req, res, next){
    try {
        if(err.name == 'SequelizeDatabaseError'){
            next(err)
        } else {
            res
                .status(err.statusCode || 400)
                .json(err.message.split('\n'))
        }
    }
    catch(err){
        next(err)
    }
}

function serverErrorHandler(err, req, res, next){
    err = { msg: 'Server currently unable to handle this request'}
    res.status(500).json(err)
}

module.exports = { clientErrorHandler, serverErrorHandler }