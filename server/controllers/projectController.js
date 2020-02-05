const Project = require('../models').Project;

class ProjectController{
    static create(req,res,next){
        Project.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static readAll(req,res,next){
        Project.findAll()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }    

    static readOne(req,res,next){
        Project.findByPk(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static update(req,res,next){
        Project.updateOne(
            req.body,
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static delete(req,res,next){
        Project.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = ProjectController