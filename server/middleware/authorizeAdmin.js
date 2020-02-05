"use strict"

const { Project } = require("../models")
const createError = require('http-errors')

function authorized(req, res, next) {
    Project.findOne({
        where: {
            id: req.params.projectId
        }
    })
        .then(project => {
            if (!project) {
                next(createError(404, "data not found"))
            } else if (project.Admin === req.user.id) {
                next()
            } else {
                next(createError(401, "Unauthorized"))
            }
        })
        .catch(next)
}

module.exports = authorized