'use strict'

module.exports= function (err, req, res, next){
    // console.log(err)
    const error = []
    if(err.name == 'SequelizeValidationError'){
        err.errors.forEach(err => {
            error.push(err.message)
        })
        res.status(400).json({
            errors: error
        })
    }
    else if(err.code === 400){
        error.push(err.message)
        res.status(err.code).json({errors: error})
    }
    else{
        res.status(500).json({message: "internal server error"})
    }

}