const {ToDo} = require('../models')

module.exports = function(req,res,next){
    ToDo
        .findOne({where:{UserId:req.user.id,id:req.params.id}})
        .then(data=>{
            if(data){
                next()
            }
            else{
                throw({
                    StatusCode :'401',
                    message:'unAuthorized'
                }) 
                
            }
        })
        .catch(err=>{
            next(err)
        })
}