const { Project } = require('../models')

module.exports = function(req, res, next){
    Project.findOne({
        where: {
            id: req.body.project
        }
    })
    .then(projectData => {
        req.body.project = projectData.name
        next()
    })
    .catch(err => {
        next(err)
    })
}