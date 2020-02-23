const UserProject = require('../models').UserProject;
const db = require('../models');

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

    static invite(req,res,next){
        db.User.findByPk(req.body.UserId)
        .then(response => {
            if(response){
                UserProject.create({
                    ProjectId : req.params.ProjectId,
                    UserId : req.body.UserId
                })
                .then(response => {
                    res.status(201).json(response)
                })
            } else {
                next('user-not-found')
            }
        })
    }
    
    static uninvite(req,res,next){
        db.User.findByPk(req.body.UserId)
        .then(response => {
            if(response){
                UserProject.destroy({
                    where : {
                        ProjectId : req.params.ProjectId,
                        UserId : req.body.UserId
                    }
                })
                .then(response => {
                    res.status(201).json(response)
                })
            } else {
                next('user-not-found')
            }
        })
    }
}

module.exports = UserProjectController