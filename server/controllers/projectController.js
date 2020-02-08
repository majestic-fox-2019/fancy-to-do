const { Project, UserProject, User, Todo } = require('../models')
const sendEmail = require('../helpers/mail')

class ProjectController {
  static createProject(req, res, next) {
    const data = {
      name: req.body.name,
      owner: req.loggedIn.id
    }
    let projectData = null
    Project.create(data)
      .then(result => {
        projectData = result
        return UserProject.create({
          UserId: req.loggedIn.id,
          ProjectId: result.id,
          status: 'join'
        })
      })
      .then(final => {
        res.status(201).json({ projectData, final })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static deleteProject(req, res, next) {
    let data = null
    Project.findOne({ where: { id: req.params.projectId } })
      .then(result => {
        data = result
        return Project.destroy({ where: { id: req.params.projectId } })
      })
      .then(n => {
        return UserProject.destroy({
          where: { ProjectId: req.params.projectId }
        })
      })
      .then(v => {
        return Todo.destroy({ where: { ProjectId: req.params.projectId } })
      })
      .then(final => {
        res.status(200).json({
          data: data
        })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static getAllProject(req, res, next) {
    const id = req.params.id
    Project.findAll()
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllProjectTodo(req, res, next) {
    Todo.findAll({ where: { ProjectId: req.params.projectId } })
      .then(results => {
        if (results.length == 0) {
          throw { errCode: 404, msg: 'There are nothing to show' }
        } else {
          res.status(200).json(results)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static getOneProject(req, res, next) {
    let data = null
    UserProject.findAll({
      where: { ProjectId: req.params.projectId, status: 'join' },
      include: [
        { model: Project, attributes: ['id', 'name', 'owner'] },
        { model: User, attributes: ['email'] }
      ]
    })
      .then(result => {
        if (result.length == 0) {
          throw { errCode: 404, msg: 'Project not found' }
        } else {
          let temp = {
            id: null,
            name: null,
            owner: null,
            members: []
          }
          temp.id = result[0].Project.id
          temp.name = result[0].Project.name
          temp.owner = result[0].Project.owner
          result.forEach(el => {
            temp.members.push(el.User.email)
          })
          data = temp
          return Todo.findAll({ where: { ProjectId: req.params.projectId } })
        }
      })
      .then(todos => {
        res.status(200).json({ data, todos })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static getUserProject(req, res, next) {
    const id = req.loggedIn.id
    UserProject.findAll({
      where: { UserId: id, status: 'join' },
      include: [Project]
    })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static getUserInvitation(req, res, next) {
    const id = req.loggedIn.id
    UserProject.findAll({
      where: { UserId: id, status: 'pending' },
      include: [Project]
    })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        console.log(err.response)
        next(err)
      })
  }

  static inviteProject(req, res, next) {
    let data
    let email = req.body.email
    User.findOne({ where: { email: email } })
      .then(result => {
        if (!result) {
          throw { errCode: 404, msg: 'User not found' }
        } else {
          data = {
            UserId: result.id,
            ProjectId: req.params.projectId,
            status: 'pending'
          }
          return UserProject.findOne({
            where: { UserId: result.id, ProjectId: req.params.projectId }
          })
        }
      })
      .then(response => {
        if (response) {
          throw { errCode: 400, msg: 'User already in this project' }
        } else {
          return UserProject.create(data)
        }
      })
      .then(final => {
        sendEmail(email)
        res.status(201).json({ final, msg: 'User invited' })
      })
      .catch(err => {
        next(err)
      })
  }

  static patchStatus(req, res, next) {
    const id = req.loggedIn.id
    const status = {
      status: req.body.status
    }
    UserProject.findOne({
      where: { ProjectId: req.params.projectId, UserId: id }
    })
      .then(result => {
        if (!result) {
          throw { errCode: 404, msg: 'Project not found' }
        } else {
          return UserProject.update(status, {
            where: { ProjectId: req.params.projectId, status: 'pending' }
          })
        }
      })
      .then(final => {
        console.log(final)
        res.status(200).json(final)
      })
      .catch(err => {
        next(err)
      })
  }

  static leaveProject(req, res, next) {
    const id = req.loggedIn.id
    UserProject.destroy({
      where: { UserId: id, ProjectId: req.params.projectId }
    })
      .then(result => {
        res.status(200).json({
          message: 'User leave project',
          result
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static createProjectTodo(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      status: 'ongoing',
      UserId: req.loggedIn.id,
      ProjectId: req.params.projectId
    }
    Todo.create(data)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProjectController
