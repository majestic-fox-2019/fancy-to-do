module.exports = (err,req,res,next) => {
    console.log(err)
    if(err.name){
        res.status(400).json({msg : err.errors[0].message})
    }
    switch (err){
        case "invalid-token" : 
            res.status(401).json({msg : 'Invalid token'})
            break
        case 'user-not-found' : 
            res.status(404).json({msg : 'user not found'})
            break
        case 'project-not-found' : 
            res.status(404).json({msg : 'project not found'})
            break
        case 'todo-not-found' : 
            res.status(404).json({msg : 'todo not found'})
            break
        case 'unauthorized' : 
            res.status(404).json({msg : 'unauthorized'})
            break
        case 'profanity' : 
            res.status(400).json({msg : 'words contain profanity'})
            break
        case 'invalid-password' : 
            res.status(400).json({msg : 'invalid password'})
            break
    }
};
