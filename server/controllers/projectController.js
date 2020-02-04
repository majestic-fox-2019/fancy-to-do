const modelProject = require("../models").Project
const modelProjectUser = require("../models").ProjectUser
const modelTodo = require("../models").Todo
const modelUser = require("../models").User
class ControlProject {
    static createProject(req, res, next) {
        let project
        let { name } = req.body
        modelProject.create({
            name
        })
            .then(projectCreated => {
                project = projectCreated
                return modelProjectUser.create({
                    UserId: req.payload.id,
                    ProjectId: projectCreated.id
                })
            })
            .then(allDone => {
                res.status(201).json({ allDone, project })
            })
            .catch(err => {
                next(err)
            })
    }
    static addTodoProject(req, res, next) {
        let { title, description, status, due_date } = req.body
        let ProjectId = req.params.idProject
        let UserId = req.payload.id
        modelTodo.create({
            title,
            description,
            status,
            due_date,
            ProjectId,
            UserId
        })
            .then(createdTodo => {
                res.status(200).json(createdTodo)
            })
            .catch(err => {
                next(err)
            })
    }

    static editTodoProject(req, res, next) {
        let { title, description, status, due_date } = req.body
        let UserId = req.payload.id
        let ProjectId = req.ProjectId

        modelTodo.update({
            title, description, status, due_date, UserId, ProjectId
        }, { where: { id: req.params.idTodo }, returning: true })
            .then(todoUpdated => {
                if (todoUpdated.length > 0) {
                    res.status(200).json(todoUpdated)
                } else {
                    next({ code: 404, message: "id todo not found" })
                }
            })
            .catch(err => {
                next(err)
            })

    }

    static deleteTodoProject(req, res, next) {
        let data
        modelTodo.findOne({ where: { id: req.params.idTodo } })
            .then(dataFound => {
                if (dataFound) {
                    data = dataFound
                    return modelTodo.destroy({ where: { id: req.params.idTodo } })
                } else {
                    next({ code: 404, message: "id todo not found" })
                }
            })
            .then(deleted => {
                res.status(200).json({ data, deleted })
            })
            .catch(err => {
                next(err)
            })
    }

    static addMember(req, res, next) {

        modelUser.findOne({ where: { email: req.body.email } })
            .then(userFound => {
                if (userFound) {
                    return modelProjectUser.findOne({
                        where: {
                            ProjectId: req.ProjectId,
                            UserId: userFound.id
                        }
                    })
                } else {
                    next({ code: 404, message: "User not found" })
                }
            })
            .then(userJoined => {
                if (userJoined) {
                    next({ code: 400, message: "User have already in this project" })
                } else {
                    return modelProjectUser.create({
                        UserId: userFound.id,
                        ProjectId: req.ProjectId
                    })
                        .then(projectUserCreated => {

                            res.status(201).json(projectUserCreated)
                        })
                }
            })

            .catch(err => {
                next(err)
            })
    }

    static getMyProjects(req, res, next) {
        modelProjectUser.findAll({ where: { UserId: req.payload.id }, include: [modelProject] })
            .then(allMyProjects => {
                if (allMyProjects) {
                    res.status(200).json(allMyProjects)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static allProject(req, res, next) {
        modelProjectUser.findAll({ include: [modelProject, modelUser] })
            .then(allProjects => {
                res.status(200).json(allProjects)
            })
            .catch(err => {
                next(err)
            })
    }

    static allTodoInProject(req, res, next) {
        modelTodo.findAll({ where: { ProjectId: req.params.idProject } })
            .then(allTodosfound => {
                res.status(200).json(allTodosfound)
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllMemberinProject(req, res, next) {
        modelProjectUser.findAll({ where: { ProjectId: req.params.idProject }, include: modelUser })
            .then(allMembers => {
                res.status(200).json(allMembers)
            })
            .catch(err => {
                next(err)
            })
    }

    static getProjectName(req, res, next) {
        // console.log("MASUK")
        // modelTodo.findOne({where: {id: req.params.id}})
        // .then(todoFound =>{

        // })
        modelProject.findOne({ where: { id: req.params.id } })
            .then(ketemu => {

                res.status(200).json(ketemu)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControlProject