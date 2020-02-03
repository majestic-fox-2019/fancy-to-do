const { Todo } = require('../models')

class ControllerTodo{

  static create(req,res,next){
    let data = {
      title: req.body.title,
      description: req.body.description,
      status : req.body.status,
      due_date : req.body.due_date
    }
    Todo.create(data)
    .then(result=>{
      res.status(201).json(data)
    })
    .catch(err=>{

      let objErr={}
       objErr.statusCode = 400
       objErr.data = err.errors
      next(objErr)
    })
  }

  static findall(req,res,next){
    Todo.findAll()
    .then(result=>{
      if(result.length>0){
        res.status(200).json(result)
      }else{
        const message ={
          statusCode : 204,
          data : 'Data is Empty'
        }
        throw message
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static findone(req,res,next){
    Todo.findByPk(req.params.id)
    .then(result=>{
    console.log(result)
      if(result == null){
        const message = {
          statusCode : 404,
          data : 'Error Not Found'
        }
        throw message
      }else{
        res.status(200).json(result)
      }
    })
    .catch(err=>{
      next(err)
    })
  }


  static edit(req,res,next){
    let data = {
      title: req.body.title,
      description: req.body.description,
      status : req.body.status,
      due_date : req.body.due_date
    }

    Todo.update(data,{
      where: {id: req.params.id},
      returning : true
    })
    .then(result=>{

      if(result[0] == 0){
        
        let objErr={}
        objErr.statusCode = 404
        objErr.data = 'Not Found'
        throw objErr
      }else{
        res.status(200).json(result[1])
      }
    })
    .catch(err=>{
      if(err.name == "SequelizeValidationError"){
        let objErr={}
        objErr.statusCode = 400
        objErr.data = err.errors
        next(objErr)
      }else{
        next(err)
      }
      
    })
  }

  static delete(req,res,next){
    let id = req.params.id
    let data = {}
    Todo.findOne({
      where: {id:id}
    })
    .then(result=>{
      data = result
      return Todo.destroy({
        where: {id:id}
      })
    })
    .then(()=>{
     
      if(data == null){
        let objErr={}
        objErr.statusCode = 404
        objErr.data = 'Not Found'
        throw objErr
      }else{
        res.status(200).json(data)
      }
    })
    .catch(err=>{
      next(err)
    })
    
  }

  

}

module.exports= ControllerTodo