module.exports = (err, req, res, next) => {
    if(err.statusCode){
        res.status(err.statusCode).json(err.data)
    }else{
        res.sendStatus(500)
    }
}