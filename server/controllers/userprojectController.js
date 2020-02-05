const UserProject = require('../models').UserProject;

class UserProjectController{
    static create(req,res,next){
        UserProject.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static readAll(req,res,next){
        UserProject.findAll()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static readOne(req,res,next){
        UserProject.findByPk(req.params.id)
        .then(response=> {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static update(req,res,next){
        UserProject.updateOne(req.body,{where : {
            id : req.params.id
        }})
        .then(response=> {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static delete(req,res,next){
        UserProject.destroy({
            where : {
                id : req.params.id
            }
        })
    }
}

module.exports = UserProjectController