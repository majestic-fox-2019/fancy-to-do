const { User, Project, ProjectUser, Todo } = require('../models')
const createError = require('http-errors')
class ControllerProject {
  static create(req, res, next) {
    const newProject = {
      name: req.body.name,
      author: req.userInfo.username
    }
    let projectData
    Project.create(newProject)
      .then((project) => {
        projectData = project
        const value = {
          UserId: req.userInfo.id,
          ProjectId: project.id,
          author: req.userInfo.username
        }
        return ProjectUser.create(value)
      })
      .then(() => {
        res.status(201).json(projectData)
      })
      .catch((err) => {
        next(err)
      })
  }

  static joinProject(req, res, next) {
    let data = {
      UserId: req.userInfo.id,
      ProjectId: req.params.id
    }
    ProjectUser.findOne({
      where: {
        UserId: req.userInfo.id,
        ProjectId: req.params.id
      }
    })
      .then((result) => {
        if (result) {
          let err = createError(400, 'Already joined this project')
          next(err)
        } else {
          return ProjectUser.create(data)
        }
      })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static inviteMember(req, res, next) {
    let userData
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        if (!user) {
          let err = createError(404, 'User Not Found')
          next(err)
        } else {
          userData = user
          return ProjectUser.findOne({
            where: {
              ProjectId: req.params.id,
              UserId: user.id
            }
          })
        }
      })
      .then((result) => {
        if (result) {
          let err = createError(401, 'User already joined')
          next(err)
        } else {
          const data = {
            UserId: userData.id,
            ProjectId: req.params.id
          }
          return ProjectUser.create(data)
        }
      })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findAll(req, res, next) {
    Project.findAll()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findOne(req, res, next) {
    ProjectUser.findAll({
      where: {
        ProjectId: req.params.id
      },
      include: [{ model: User }, { model: Project }]
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    const value = {
      name: req.body.name
    }
    Project.update(value, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
      .then((result) => {
        res.status(200).json(result[1])
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let project
    Project.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result) => {
        project = result
        return Project.destroy({
          where: {
            id: req.params.id
          }
        })
      })
      .then(() => {
        res.status(200).json(project)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = ControllerProject
