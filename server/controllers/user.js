const Model = require('../models')
const User = Model.User
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const axios = require('axios')
require('dotenv').config()
const instance = axios.create({
  baseURL: `https://api.mailboxvalidator.com/v1/validation/single?key=${process.env.APIkey}`
});
const { OAuth2Client } = require('google-auth-library');



class ControllerUser {
  static register(req, res, next) {

    let body = req.body

    instance.get(`&email=${req.body.email}`)
      .then(validateResult => {
        if (validateResult.data.is_verified == "True") {
          return User.create({
            username: body.username,
            email: body.email,
            password: body.password
          })
        } else {
          let err = {
            statusCode: '400',
            message: 'Bad Request'
          }
          next(err)
        }
      })
      .then(result => {
        const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_RAHAYU)
        res.status(201).json(token)
      })
      .catch((err) => {
        if (err.message != 0) {
          err.statusCode = '400'
        } else {
          err.statusCode = '500'
        }
        next(err)
      })
  }

  static login(req, res, next) {
    let email = req.body.email
    let password = req.body.password
    User
      .findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: "Unauthorized" })
        } else {
          if (bcrypt.compareSync(password, user.password)) {

            const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_RAHAYU)

            res.status(200).json(token)
          } else {
            res.status(401).json({ message: "Unauthorized" })
          }
        }
      })
      .catch(err => {
        res.status(404).json(err.message)
      })
  }

  static googleSign(req, res, next) {
    let payload
    const client = new OAuth2Client(process.env.GoogleClienId);
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GoogleClienId,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
      .then(ticket => {
        payload = ticket.getPayload()
        // const userid = payload['sub']
        return User
          .findOne({
            where: {
              email: payload.email
            }
          })
          .then(result => {
            if (result) {
              const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_RAHAYU)
              res.status(201).json(token)
            } else {
              User
                .create({
                  username: payload.given_name,
                  email: payload.email,
                  password: process.env.DefaultPassword
                })
                .then(newUser => {
                  const token = jwt.sign({ email: newUser.email, id: newUser.id }, process.env.JWT_RAHAYU)
                  res.status(201).json(token)
                })
            }
          })
      })
      .catch(err => {
        console.log(err)
      })
  }


  // static gitHub(req, res, next) {
  //   const { code } = req.query
  //   axios({
  //     method: 'POST',
  //     url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENTID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
  //     headers: {
  //       Accept: "application/json"
  //     }
  //   })
  //     .then(result => {
  //       // console.log(result.data.access_token)
  //       return axios({
  //         method: 'GET',
  //         url: `https://api.github.com/user`,
  //         headers: {
  //           Authorization: `token ${result.data.access_token}`
  //         }
  //       })
  //     })
  //     .then(gitHubUserData => {
  //       return User
  //         .findOne({
  //           where: { email: gitHubUserData.data.email }
  //         })
  //         .then(resultUser => {
  //           if (resultUser) {
  //             let dataUserFromGitHub = resultUser.dataValues
  //             const token = jwt.sign({ email: dataUserFromGitHub.email, id: dataUserFromGitHub.id }, process.env.JWT_RAHAYU)
  //             // res.status(200).json(token)
  //             res.redirect(`http://localhost:8080/?token=${token}&email=${dataUserFromGitHub.email}&id=${dataUserFromGitHub.id}`)
  //           } else {

  //             return User
  //               .create({
  //                 username: gitHubUserData.data.name,
  //                 email: gitHubUserData.data.email,
  //                 password: process.env.DefaultPassword
  //               })
  //               .then(newUserGithub => {
  //                 // console.log(newUserGithub.dataValues, 'masuk ga')
  //                 const { email, id, username } = newUserGithub.dataValues
  //                 const token = jwt.sign({ email, id }, process.env.JWT_RAHAYU)
  //                 res.redirect(`http://localhost:8080/?token=${token}&usernam=${username}&email=${email}&id=${id}`)
  //                 // res.status(201).json(token)
  //               })
  //           }

  //         })

  //     })
  //     .catch(err => {
  //       // next(err)
  //       console.log(err)
  //     })

  // }

}



module.exports = ControllerUser

