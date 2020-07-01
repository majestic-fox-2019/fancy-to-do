module.exports = function (err, req, res, next)
    {if(err.StatusCode){
        res.status(err.StatusCode).json({
        message:err.message
    })
    // console.log(err.message)
    }
    else{
        res.status(500).send('server is error')
    }
}