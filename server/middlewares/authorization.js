const { Todo, Project, UserProject } = require('../models')

function todoAuthorization(req, res, next) {
  const userID = req.loggedIn.id
  let flag = false
  Todo.findOne({ where: { id: req.params.id } })
    .then(result => {
      if (result.dataValues.ProjectId == null) {
        flag = true
        if (result.dataValues.UserId != userID) {
          throw { errCode: 403, msg: 'Sorry, you are not authorized' }
        } else {
          next()
        }
      } else {
        return UserProject.findOne({where: {ProjectId: result.dataValues.ProjectId, UserId: userID}})
      }
    })
    .then(final => {
      if (flag) {
        return
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

function projectAuthorization(req, res, next) {
  const userID = req.loggedIn.id
  Project.findOne({ where: { id: req.params.projectId } })
    .then(result => {
      if (!result || result.owner != userID) {
        throw { errCode: 403, msg: 'Sorry, you are not authorized' }
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { todoAuthorization, projectAuthorization }
