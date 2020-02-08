const {Project,User,ProjectUser} = require('../models')
const { Op } = require("sequelize");
class ProjectController {
  static create(req,res,next){
    const value = {
      name: req.body.name,
      due_date: req.body.due_date,
      owner:req.user.id
    }
    Project
      .create(value)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static findAll(req,res,next){
  Project
    .findAll({
      where : {
        [Op.or] : {
          owner: req.user.id,
          '$UserId$': req.user.id
        }
      },
      include : [
        {model:ProjectUser}
      ],
      order: [
          ["due_date","ASC"]
        ]
    })
    .then(projects => {
      res
        .status(200)
        .json(projects)
    })
    .catch(next)
  }

  static findById(req,res,next){
    const id = req.params.id
    const optUser = {
      where : {
        id : {
          [Op.not]: req.user.id
        },
        '$ProjectId$':null
      },
      include : [
        {
          model:ProjectUser,
          where:{
            ProjectId:id
          },
          required:false
        }
        
      ]
    }
    const optProject = {
      include : [
        {
          model:User,
        }
        
      ]
    }
    Promise
      .all([Project.findByPk(id,optProject),User.findAll(optUser)])
      .then(result => {
        const obj = {
          data : result[0],
          users : result[1]
        }
        res.status(200).json(obj)
      })
      .catch(next)
  }

  static update(req,res,next){
    const id = req.params.id
    const opt = {
      returning : true
    }
    const {name, due_date} = req.body
    Project
      .findByPk(id)
      .then(project => {
        if (project){
          return project
                  .update({name, due_date},opt)
        }else{
          throw createError(404,"project not found")
        } 
      })
      .then(project => {
        res
          .status(200)
          .json(project)
      })
      .catch(next)
  }

  static delete(req,res,next){
    const id = req.params.id
    Promise
      .all(
        [
          Project
            .destroy({
              where : {
                id:id
              }
            }),
          ProjectUser
            .destroy({
              where : {
                ProjectId:id
              }
            })
        ]
      )
      .then(result => {
        res
          .status(200)
          .json(result)
      })
      .catch(next)
  }
}
module.exports = ProjectController