const {ToDo} = require('../models')

class ToDoController {

    static create(req,res,next){
        let isi = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }
        ToDo
        .create(isi)
        .then(data=>{
                res.status(201).json(data)

            
            
        })
        .catch(err=>{
            if(err.message != 0){
                err.StatusCode = '400'
            }
            else{
                err.StatusCode = '500'
            }
            next(err)
        })
    }

    static findAll(req,res,next){
        ToDo
        .findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>[
            next(err)
        ])
    }

    static findOne(req,res,next){
        ToDo
        .findOne({where:{
            id:req.params.id
        }})
        .then(data=>{
            if(data){
                res.status(200).json(data)
            }
            else{
                let err= {
                    StatusCode :'404',
                    message:'error not found'
                }
                next(err)

            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static update(req,res,next){
        let isi = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }
        ToDo
        .update(isi,{
            where: { id: req.params.id },
            returning: true
          })
        .then(data=>{
            // res.send(data)
            if(data[0] != 0){
                res.status(200).json(data[1][0])
            }
            else{
                let msg= {
                    StatusCode :'404',
                    message:'command not found'
                }
                next(msg)

            }
        })
        .catch(err=>{
            if(err.message != 0){
                err.StatusCode = '400'
            }
            else{
                err.StatusCode = '500'
            }
            next(err)
        })
    }

    static delete(req,res,next){
        let isi = null
        ToDo
        .findOne({where:{id:req.params.id}})
        .then(data=>{
             isi = data
            if(data){
                return ToDo.destroy({where:{id:req.params.id}})
            }
            else{
                let msg= {
                    StatusCode :'404',
                    message:'command not found'
                }
                next(msg)
            }
        })
        .then(data=>{
            // res.send(data) 
                res.status(200).json(isi)
            
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ToDoController