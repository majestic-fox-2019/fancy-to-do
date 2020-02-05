const modelTodo = require("../models").Todo
const modelProject = require("../models").Project
class TodoController {
    static createTodo(req, res, next) {
        let UserId = req.payload.id
        let { title, description, status, due_date } = req.body
        modelTodo.create({
            title,
            description,
            status,
            due_date,
            UserId
        })
            .then(todoCreated => {
                res.status(201).json(todoCreated)
            })
            .catch(err => {
                next(err)
            })
    }
    static getAll(req, res, next) {
        modelTodo.findAll()
            .then(allTodo => {
                if (allTodo) {
                    res.status(200).json(allTodo)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getTodoById(req, res, next) {
        modelTodo.findByPk(req.params.id)
            .then(todoByIdFound => {
                if (todoByIdFound) {
                    res.status(200).json(todoByIdFound)
                } else {
                    // console.log("masuk sini kok")
                    next({ code: 404, message: "id todo not found" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static editTodo(req, res, next) {
        let { description, title, due_date, status } = req.body
        modelTodo.update(
            { description, title, due_date, status },
            { where: { id: req.params.id }, returning: true })
            .then(updated => {
                // console.log(updated, "ini updated <<")
                if (updated.length > 0) {
                    res.status(200).json(updated)
                } else {
                    next({ code: 404, message: "id todo not found" })
                }
            })
            .catch(err => {
                next(err)
            })

    }

    static deleteTodo(req, res, next) {
        let data
        modelTodo.findOne({ where: { id: req.params.id } })
            .then(dataFound => {
                if (dataFound) {
                    data = dataFound
                    return modelTodo.destroy({ where: { id: req.params.id }, returning: true })

                }
            })
            .then(deleted => {
                if (deleted > 0) {
                    res.status(200).json({ data, deleted })
                } else {
                    next({ code: 404, message: "id todo not found" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getMine(req, res, next) {
        modelTodo.findAll(
            { where: { UserId: req.payload.id }, order: [["updatedAt", "DESC"]] })
            .then(myTodos => {
                if (myTodos) {
                    // let detail = []
                    // for (let i of myTodos) {
                    //     if (i.ProjectId == null) {
                    //         detail.push({ id: i.id, detail: "Individual" })
                    //     } else {
                    //         modelProject.findOne({ where: { id: i.ProjectId } })
                    //             .then(ketemu => {
                    //                 // console.log(ketemu.dataValues.name, "=====")
                    //                 detail.push({ id: i.id, detail: ketemu.dataValues.name })
                    //             })
                    //             .catch(err => {
                    //                 next(err)
                    //             })
                    //     }
                    // }
                    res.status(200).json(myTodos)
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController