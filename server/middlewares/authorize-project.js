const { Project, ProjectUser } = require('../models')
const createError = require('http-errors')
const Op = require('sequelize').Op

function checkProject(req, res, next) {
  Project.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((project) => {
      if (!project) {
        const err = createError(404, 'Project Not found')
        next(err)
      } else {
        next()
      }
    })
    .catch((err) => {
      next(err)
    })
}

function authorize(req, res, next) {
  ProjectUser.findOne({
    where: {
      [Op.and]: [
        {
          UserId: req.userInfo.id
        },
        {
          ProjectId: req.params.id
        }
      ]
    }
  })
    .then((result) => {
      if (!result) {
        const err = createError(401, 'Unauthorized User')
        next(err)
      } else {
        next()
      }
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = { authorize, checkProject }
