function clientErrorHandler (err, req, res, next){
    try {
        if(err.statusCode){
            res
                .status(err.statusCode)
                .json({ errors: err.message})
        } else {
            message = []
            err.errors.forEach(el => {
                message.push(el.message)
            });
    
            res
                .status(400)
                .json({ errors: message})
        }
    }
    catch(err){
        next(err)
    }
}

function serverErrorHandler(err, req, res, next){
    res.status(500).json({ message: 'Server currently unable to handle this request'})
}

module.exports = { clientErrorHandler, serverErrorHandler }