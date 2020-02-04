function basicError(err, req, res, next){
    console.log(err.message);
    try {
        if (err.statusCode) { // Handling Error with status code and message, such as 404
            res.status(err.statusCode).json({Error: err.message});
        }else if(err.message) { // Handling validations error from model, 400
            let arrValidations = [];
            err.errors.forEach(validation => {
                arrValidations.push(validation.message);
            });
            res.status(400).json({Validations: arrValidations});                        
        }            
    } catch (error) { // 500
        res.status(500).json({msg:"Something went wrong... it's not your fault, that's our server problem!"});
    }
}

module.exports = basicError