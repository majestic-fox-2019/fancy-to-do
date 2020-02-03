const { Todo } = require("../models")
class todoController {
    static getAll(req,res,next){
        Todo.findAll()
            .then(data=>{
                res.status(201).json({
                    message:"success",
                    result :data
                });
            })
    }
    static createOne(req,res,next){
        const objInput = {
            Title:req.body.title,
            Description:req.body.description,
            Status:req.body.status,
            Due_date:req.body.due_date 
        }
        Todo
            .create(objInput)
            .then(result => {
                res.status(201).json({
                    message:"success",
                    data :objInput
                });
            })
            .catch(err=>{  
                if(err){
                    err.statusError= 400
                }
                next(err)
            })
    }
    static findOne(req,res,next){
        const id = req.params.id;
        Todo
            .findByPk(id)
            .then(data=>{
                console.log(data)
                if(data){
                    res.status(200).json({
                       data
                    });
                }
                else{
                    let err ={
                        statusError :404,
                        message :"error not found"
                    }
                    next(err)
                }
            })
            .catch(err=>{
                throw({
                    statusError: 404,
                    message : "Cannot get data"
                })
            })
    }
    static updates(req,res,next){
        const objInput = {
            Title:req.body.title,
            Description:req.body.description,
            Status:req.body.status,
            Due_date:req.body.due_date
        }
        Todo   
            .update(objInput,{
                where:{
                    id: req.params.id
                },
                returning: true,
                plain : true
            })
            .then(data=>{
                if(data.length>0){
                    res.send(data)
                    res.status(200).json({
                        message:"success",
                        result : data[1]
                    })
                }
                else{
                    let err ={
                        statusError :404,
                        message :"data not found"
                    }
                    next(err)
                }
            })
            .catch(err=>{
                if(err){
                    err.statusError = 400
                }
                next(err)
            })
    }
    static delete(req,res,next){
        const id = req.params.id;
        var objResult;
        Todo  
            .findByPk(id)
            .then(data=>{
                objResult= data;
                return Todo
                    .destroy({
                        where:{
                            id:req.params.id
                        }
                    })
            })
            .then(data=>{
                if(data>0){
                    res.status(200).json({
                        message:"success",
                        result : objResult 
                    })
                }
                else{
                    let err ={
                        statusError :400,
                        message :"error not found"
                    }
                    next(err)
                }
            })
            .catch(err=>{
                throw({
                    statusError: 404,
                    message : "Cannot get data"
                })
            })
    }
}
module.exports = todoController;