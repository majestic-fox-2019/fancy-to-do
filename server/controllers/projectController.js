const {Project, UserProject, User} = require('../models')

class projectController{
  static find(req,res,next) {
    Project.findAll({
      where: {
        id: req.params.id
      },
      include: [User]
    })
    .then(result=>{
      // console.log(result[0])
      console.log(result[0].dataValues.Users)
      let data = {
        project_name: result[0].project_name,
        description: result[0].description,
        status: result[0].status,
        due_date: result[0].due_date,
        members: result[0].dataValues.Users
      }
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

  static addMember(req,res,next){
    console.log(req.body)
    let id
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(exists=>{
      if(exists == null){
        throw {
          status: 404,
          message: 'email is not found'
        }
      }else{
        console.log(exists.dataValues.id)
        id = exists.dataValues.id
        return UserProject.findOne({
          where: {
            UserId: exists.dataValues.id,
            ProjectId: req.body.id
          }
        })
      }
    })
    .then(result=>{
      if(result == null){
        console.log(result)
        let userProjectObj ={
          UserId: id,
          ProjectId: req.body.id
        }
        return UserProject.create(userProjectObj)
      }else{
        throw {
          status: 400,
          message: 'already added to your project'
        }
      }
    })
    .then(finish=>{
      res.status(201).json(finish)
    })
    .catch(err=>{
      next(err)
    })
  }

  static list(req, res, next){
    console.log(req.user.id)
    User.findOne({
      where: {
        id: req.user.id,
      },
      include: {
        model : Project,
        include: {
          model : UserProject
        }
      }
      // include: [Project]
    })
      .then(result=>{
        console.log(result.dataValues.Projects[0])
        res.status(201).json(result.dataValues.Projects)
      })
      .catch(err=>{
        next(err)
      })
  }
  static create(req, res, next){
    console.log('pop')
    console.log(req.body)
    let projectObj = {
      project_name: req.body.project_name,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Project.create(projectObj)
      .then(project=>{
        let userProjectObj ={
          UserId: req.user.id,
          ProjectId: project.id
        }
        return UserProject.create(userProjectObj)
      })
      .then(result=>{
        res.status(201).json(result)
      })
      .catch(err=>{
        next(err)
      })
  }

}

module.exports = projectController