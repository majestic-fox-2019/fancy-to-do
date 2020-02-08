const {ProjectUser} = require('../models')
class ProjectUserController {
  static create(req,res,next){
    const value = {
      ProjectId: req.body.ProjectId,
      UserId: req.body.UserId
    }
    ProjectUser
      .create(value)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static delete(req,res,next){
    const id = req.params.id
    let deleted = null
    ProjectUser
      .findOne({
        where:{
          UserId:id
        }
      })
      .then(member => {
        if (member){
          deleted = member
          return member.destroy()
        }else{
          throw createError(404,"member not found")
        } 
      })
      .then(member => {
        res
          .status(200)
          .json(deleted)
      })
      .catch(next)
  }
}
module.exports = ProjectUserController