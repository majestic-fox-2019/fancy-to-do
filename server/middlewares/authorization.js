const modelTodo = require("../models").Todo
const modelProjectUser = require("../models").ProjectUser
const modelUser = require("../models").User
function forIndividualTodo(req, res, next) {
    modelTodo.findOne({ where: { id: req.params.id, UserId: req.payload.id } })
        .then(todoFound => {
            if (todoFound) {
                next()
            } else {
                next({ code: 401, message: "Unauthorized" })
            }
        })
        .catch(err => {
            next(err)
        })
}

function forProject(req, res, next) {
    if (req.params.idProject) {

        modelProjectUser.findAll({ where: { UserId: req.payload.id }, include: modelUser })
            .then(found => {
                if (found.length > 0) {

                    for (let i of found) {
                        if (i.ProjectId == req.params.idProject && i.User.id == req.payload.id) {
                            req.ProjectId = i.ProjectId
                        }
                    }
                    if (!req.ProjectId) {
                        next({ code: 401, message: "Unauthorized" })
                    } else {
                        next()
                    }

                } else {
                    next({ code: 400, message: "id not found" })
                }
            })
            .catch(err => {
                next(err)
            })
    } else if (req.params.idTodo) {
        modelTodo.findAll({ where: { id: req.params.idTodo } })
            .then(foundTodos => {

                if (foundTodos.length == 0) {
                    next({ code: 404, message: "Id todo not found" })
                }

                for (let j of foundTodos) {
                    if (j.UserId == req.payload.id) {

                        req.ProjectId = j.ProjectId
                    }
                }

                if (!req.ProjectId) {
                    next({ code: 401, message: "Unauthorized" })
                } else {
                    next()
                    // res.status(200).json(ok)
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = { forIndividualTodo, forProject }