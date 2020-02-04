const { Project, ProjectUser, User } = require('../models')

class ProjectController {
    static create(req, res, next) {
        Project.create({
            name: req.body.name,
            status: 'On Progress',
            owner: req.loggedUser.id
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
            include: [{ model: User, attributes: ['userName'] }, { model: Project }]
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
                if (!userData) {
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
                if (result.length > 0) {
                    throw ({
                        statusCode: 400,
                        message: 'Member is already in this Project'
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

    static findProjectMember(req, res, next) {
        let project = {}
        ProjectUser.findAll({
            where: { ProjectId: req.params.projectId },
            include: [{ model: User, attributes: ['userName'] }, { model: Project }]
        })
            .then(ProjectDatas => {
                if (ProjectDatas.length < 1) {
                    throw ({
                        statusCode: 404,
                        message: 'Project not found'
                    })
                }
                let members = []
                ProjectDatas.forEach(element => {
                    members.push(element.User.userName)
                })
                let projectName = ProjectDatas[0].Project.name
                let projectStatus = ProjectDatas[0].Project.status
                project.name = projectName
                project.status = projectStatus
                project.member = members
                res.status(200).json({ projectName, projectStatus, members })
                // res.status(200).json(ProjectDatas)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProject(req, res, next) {
        ProjectUser.destroy({
            where: {
                ProjectId: req.params.projectId
            }
        })
        .then(result => {
            return Project.destroy({
                where: {
                    id: req.params.projectId
                }
            })
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProjectController