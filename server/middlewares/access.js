const {Project} = require("../models")
const createError = require('http-errors')
function accessProject(req,res,next){
  const id = req.params.id
  Project
    .findOne({
      where : {
        owner: req.user.id,
        id: id
      }
    })
    .then(project => {
      if (project){
        next()
      }else{
        throw createError(401,"Unauthorized")
      }
    })
    .catch(next)
}

module.exports = {accessProject}