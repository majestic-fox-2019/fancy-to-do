const { User, ProjectUser, Project } = require('../models')
const generateToken = require('../helpers/generateToken')
const createError = require('http-errors')
const { OAuth2Client } = require('google-auth-library')
class ControllerUser {
  static login(req, res, next) {
    let userData
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          let err = createError(401, 'Login error')
          next(err)
        } else {
          userData = user
          const compare = require('../helpers/compare')
          return compare(req.body.password, user.password)
        }
      })
      .then((result) => {
        if (!result) {
          let err = createError(401, 'Login error')
          next(err)
        } else {
          const payload = {
            id: userData.id,
            username: userData.username,
            email: userData.email
          }
          const token = generateToken(payload)
          res.status(200).json({
            token: token,
            username: userData.username
          })
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static register(req, res, next) {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      platform: 'normal'
    }
    User.create(data)
      .then((newUser) => {
        const payload = {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
        const token = generateToken(payload)
        res.status(201).json({
          token: token,
          username: newUser.username
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static gSignIn(req, res, next) {
    const clientId = process.env.G_CLIENT_ID
    const client = new OAuth2Client(clientId)
    let payload
    let gUser
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: clientId
      })
      .then((ticket) => {
        payload = ticket.getPayload()
        return User.findOne({
          where: {
            email: payload.email,
            platform: 'google'
          }
        })
      })
      .then((user) => {
        if (user) {
          return user
        } else {
          const randomizedUser = require('../helpers/randomizedUser')
          return User.create({
            email: payload.email,
            username: randomizedUser(payload.name),
            password: process.env.G_SIGN_DEF_PASSWORD,
            platform: 'google'
          })
        }
      })
      .then((user) => {
        console.log(user)
        const token = generateToken({
          id: user.id,
          username: user.username,
          email: user.email
        })
        res.status(201).json({
          token: token,
          username: user.username,
          platform: 'google'
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static findAll(req, res, next) {
    let currentProjectUsers = []
    ProjectUser.findAll({
      where: {
        ProjectId: req.params.id
      },
      include: [{ model: User }, { model: Project }]
    })
      .then((users) => {
        users.forEach((user) => {
          currentProjectUsers.push({
            id: user.UserId
          })
        })
        return User.findAll()
        // res.json(users)
      })
      .then((allUsers) => {
        let filteredUsers = []
        for (let i = 0; i < allUsers.length; i++) {
          let user = allUsers[i]
          let onProject = false
          for (let j = 0; j < currentProjectUsers.length; j++) {
            const onProjectUser = currentProjectUsers[j]
            if (user.id == onProjectUser.id) {
              onProject = true
            }
          }
          if (!onProject) {
            filteredUsers.push({
              id: user.id,
              username: user.username,
              email: user.email
            })
          }
        }
        res.status(200).json(filteredUsers)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = ControllerUser
