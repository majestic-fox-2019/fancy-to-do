const { Todo } = require('../models')
const createError = require('http-errors')

const Nexmo = require('nexmo')


class ControllerTodo{

  static findall(req,res,next){
    Todo.findAll({
      where: {UserId: req.user.id},
      order: [['id','ASC']]
    })
    .then(result=>{
    
      if(result.length>0){
        res.status(200).json(result)
      }else {
    
        // throw message
        res.status(204).json({message: 'data is empty'})
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static create(req,res,next){

    let data = {
      title: req.body.title,
      description: req.body.description,
      status : req.body.status,
      due_date : req.body.due_date,
      UserId : req.user.id
    }
    Todo.create(data)
    .then(result=>{
      res.status(201).json(result)

      const nexmo = new Nexmo({
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET
        })
      
      const to = '6285360510467'
      const text = `title : ${result.title} , description : ${result.description}`

      nexmo.message.sendSms('TodoList', to, text, (err,responseData)=>{
        
        if(err){
          throw err
        }else{
          if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
        }
      })
    })
    .catch(err=>{
      next(err)

    })
  }

  static findone(req,res,next){
    Todo.findByPk(req.params.id)
    .then(result=>{
      res.status(200).json(result)
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
      res.status(200).json(result[1])
    })
    .catch(err=>{
      next(err)
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
        res.status(200).json(data)

    })
    .catch(err=>{
      next(err)
    })
    
  }

  

}

module.exports= ControllerTodo