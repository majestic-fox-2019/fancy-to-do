module.exports = (err, req, res, next) => {
    if(err.statusCode){
        res.status(err.statusCode).json(err.message)
    }else{
        res.sendStatus(500)
    }
}