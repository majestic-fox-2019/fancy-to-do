"use strict"

const { Project } = require("../models")
const { ProjectTodo } = require("../models")
const { MemberProject } = require("../models")
const { User } = require("../models")
const createError = require("http-errors")

class ProjectController {
    static createProject(req, res, next) {
        const { nameProject } = req.body
        Project.create({
            nameProject,
            Admin: req.user.id
        })
            .then((result) => {
                res.status(201).json(result)
            }).catch(next);
    }
    static findAll(req, res, next) {
        Project.findAll({
            include: [
                {
                    model: User,
                    where: {
                        id: req.user.id
                    }
                }
            ]
        })
            .then((result) => {
                if (!result) {
                    next(createError(404, "not found Project"))
                } else {
                    res.status(200).json(result)
                }
            }).catch(next);
    }
    static findOne(req, res, next) {
        Project.findOne({
            where: {
                id: req.params.projectId
            },
            include: [
                {
                    model: User,
                }
            ]
        })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next);
    }
    static update(req, res, next) {
        const { nameProject } = req.body
        Project.update({
            nameProject,
            updateAt: new Date()
        }, {
            where: {
                id: req.params.projectId
            }
        })
            .then((result) => {
                if (result[0] === 0) {
                    next(createError(404, "not found Project"))
                } else {
                    return Project.findOne({
                        where: {
                            id: req.params.projectId
                        }
                    })
                        .then((hasil) => {
                            res.status(200).json(hasil)
                        }).catch((err) => {
                            next(createError(err.status, err.message))
                        });
                }
            }).catch(next);
    }
    static remove(req, res, next) {
        Project.destroy({
            where: {
                id: req.params.projectId
            }
        })
            .then((result) => {
                if (result === 0) {
                    next(createError(404, "not found Project"))
                } else {
                    return Project.findOne({
                        where: {
                            id: req.params.projectId
                        }
                    })
                        .then((hasil) => {
                            res.status(200).json(hasil)
                        })
                        .catch((err) => {
                            next(createError(err.status, err.message))
                        });
                }
            }).catch(next);
    }
    static addMember(req, res, next) {
        const idUser = Number(req.body.userId);
        MemberProject.create({
            UserId: idUser,
            ProjectId: req.params.projectId
        })
            .then((result) => {
                res.status(201).json(result)
            }).catch(next);
    }
    static deleteMember(req, res, next) {
        const idUser = Number(req.body.userId);
        MemberProject.destroy({
            where: {
                ProjectId: req.params.projectId,
                UserId: idUser
            }
        })
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }
}

module.exports = ProjectController