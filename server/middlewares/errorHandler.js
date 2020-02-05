module.exports = (err,req,res,next) => {
    console.log(err)
    switch (err){
        case "invalid-token" : 
            res.status(401).json({msg : 'Invalid token'})
            break
        case 'user-not-found' : 
            res.status(404).json({msg : 'user not found'})
    }
};
