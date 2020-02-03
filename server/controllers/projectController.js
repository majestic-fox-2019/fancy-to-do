const { Project, ProjectUser, User } = require('../models')

class ProjectController {
    static create(req, res, next) {
        Project.create({
            name: req.body.name,
            status: 'On Progress'
        })
        .then(createdProject => {
            // res.status(201).json(createdProject)
            return ProjectUser.create({
                ProjectId: createdProject.id,
                UserId: req.loggedUser.id
            })
        })
        .then(finalResult => {
            res.status(201).json(finalResult)
        })
        .catch(err => {
            next(err)
        })
    }

    static findAll(req, res, next) {
        ProjectUser.findAll({
            where: {
                UserId: req.loggedUser.id
            },
            include: [{model: User, attributes: ['userName']}, {model: Project}]
        })
        .then(projectData => {
            res.status(200).json(projectData)
        })
        .catch(err => {
            next(err)
        })
    }

    static addProjectMember(req, res, next) {
        let userInfo
        User.findOne({
            where: {
                email: req.body.userEmail
            }
        })
        .then(userData => {
            if(!userData){
                throw ({
                    statusCode: 404,
                    message: 'User not found'
                })
            } else {
                userInfo = userData
                return ProjectUser.findAll({
                    where: {
                        UserId: userData.id,
                        ProjectId: req.body.projectId
                    }
                })
            }
        })
        .then(result => {
            if(result.length > 0) {
                throw ({
                   statusCode: 400,
                   message: 'Member already in this Project'
                })
            } else {
                return ProjectUser.create({
                    UserId: userInfo.id,
                    ProjectId: req.body.projectId
                })
            }
        })
        .then(addedMember => {
            res.status(201).json(addedMember)
        })
        .catch(err => {
            next(err)
        })
    }

    static findOne(req, res, next) {
        ProjectUser.findAll({
            where: {ProjectId: req.params.id},
            include: [{model: User, attributes: ['userName']}, {model: Project}]
        })
        .then(ProjectDatas => {
            let members = []
            ProjectDatas.forEach(element => {
                members.push(element.User.userName)
            })
            let projectName = ProjectDatas[0].Project.name
            let projectStatus = ProjectDatas[0].Project.status
            res.status(200).json({projectName , projectStatus, members})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProjectController