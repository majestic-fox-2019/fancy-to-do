const { Todo, Project } = require('../models')

function todoAuthorization(req, res, next) {
  const userID = req.loggedIn.id
  Todo.findOne({ where: { id: req.params.id } })
    .then(result => {
      if (!result || result.UserId != userID) {
        throw { errCode: 403, msg: 'Sorry, you are not authorized' }
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
