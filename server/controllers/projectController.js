const { Project } = require('../models')

class ProjectController {
    static create(req, res, next) {
        Project.create({
            name: req.body.name
        })
        .then(createdProject => {
            res.status(201).json(createdProject)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProjectController