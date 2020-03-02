const {Todo} = require('../models')
class Controller{
  static create(req, res, next){
    console.log(req.body)
    let data = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.user.id
    }
    Todo.create(data)
      .then(result=>{
          res.status(201).json(result)
      })
      .catch(err=>{
        next(err)
      })
  }
  static list(req, res, next){
    console.log('masok')
    Todo.findAll({
      where: {
        UserId: req.user.id
      }
    })
      .then(result=>{
        if(result.length == 0){
          res.status(204).json(result)
        }else{
          res.status(200).json(result)
        }
      })
      .catch(err=>{
        next(err)
      })
  }
  static find(req, res, next){
    let id = req.params.id
    Todo.findByPk(id)
      .then(result=>{
        if(result){
          res.status(200).json(result)
        }else{
          throw {
            status: 404,
            message: 'id is not found'
          }
        }
      })
      .catch(err=>{
        next(err)
      })
  }
  static update(req, res, next){
    let {title, description, status, due_date} = req.body
    Todo.update({title, description, status, due_date},{
      where:{
        id: req.params.id
      },
      returning: true
    })
      .then(result=>{
        if(result[0] !== 0){
          res.status(200).json(result[1][0])
        }else{
          throw {
            status: 404,
            message: 'id is not found'
          }
        }
      })
      .catch(err=>{
        next(err)
      })
  }
  static delete(req, res, next){
    console.log('ppp')
    let data 
    let id = req.params.id
    Todo.findByPk(id)
      .then(find=>{
        data = find
        return Todo.destroy({
          where: {
            id: req.params.id
          }
        })
      })
      .then(result=>{
        if(result){
          res.status(200).json(data)
        }else{
          throw {
            status: 404,
            message: 'id is not found'
          }
        }
      })
      .catch(err=>{
        next(err)
      })
  }
}


module.exports = Controller