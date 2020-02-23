const Project = require('../models').Project;
const User = require('../models').User;
const db = require('../models');
const {Op} = require('sequelize');

class ProjectController{
    static create(req,res,next){
        req.body.AuthorId = req.user.id
        Project.create(req.body)
        .then(response => {
            res.status(201).json(response)
            db.UserProject.create({
                UserId : req.user.id,
                ProjectId : response.id
            })
            .then(response => {
                console.log('created conjunction!')
            })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static readAll(req,res,next){
        Project.findAll({
            include : [{
                model : User,
                attributes : ['email'],
                where : {
                    email : [ "jovi@mail.com" ]
                }
            },{
                model : db.Todo,
            }]
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }    

    static readOne(req,res,next){
        Project.findByPk(req.params.id, {
            include : [{
                model : User,
                attributes : ['email']
            },{
                model : db.Todo,
            }]
        })
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
            db.UserProject.destroy({
                where : {
                    UserId : req.user.id,
                    ProjectId : req.params.id
                }
            })
            .then(response => {
                console.log('deleted conjunction!')
            })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static toggleStatus(req,res,next){
        Project.findByPk(req.params.id)
        .then(response => {
            if(response){
                if(response.status === 0){
                    Project.updateOne({
                        status : 1
                    },{
                        where : {
                            id : req.params.id
                        }
                    })
                    .then(response => {
                        res.status(200).json(response)
                    })
                } else if(response.status === 1) {
                    Project.updateOne({
                        status : 0
                    },{
                        where : {
                            id : req.params.id
                        }
                    })
                    .then(response => {
                        res.status(200).json(response)
                    })
                }
            } else {
                next('project-not-found')
            }
        })
    }
}

module.exports = ProjectController