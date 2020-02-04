'use strict'

module.exports= function (err, req, res, next){
    // console.log(err.name)
    if(err.name == 'SequelizeValidationError'){
        const error = []
        err.errors.forEach(err => {
            error.push(err.message)
        })
        res.status(400).json({errors: error
        })
    }
    else if(err.code === 404){
        res.status(err.code). json({message: err.message})
    }
    else{
        res.status(500).json({message: "internal server error"})
    }

}