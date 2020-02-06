'use strict';

const { User, Project, UserProject, TodoProject } = require('../models');

class ProjectController {
    static create(req, res, next) {
        const { name } = req.body;
        const UserId = req.userLoggedIn.id;
        
        Project.create({
            name,
            UserId
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
    }

    static readAll(req, res, next) {
        const UserId = req.userLoggedIn.id;

        UserProject.findAll({
            where: {
                UserId
            },
            include: Project
        })
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next)
    }

    static update(req, res, next) {
        const id = req.params.id;
        const { name } = req.body;
        
        Project.update(
            {
                name
            },
            {
                where: {
                    id
                }
            }
        )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
    }

    static delete(req, res, next) {
        const id = req.params.id;
        Project.destroy({
            where: {
                id
            }
        })
        .then(result => {
            return UserProject.destroy({
                where: {
                    ProjectId: id
                }
            })
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
    }

    static addUserProject(req, res, next) {
        const ProjectId = req.params.id;
        const { email } = req.body;
        let UserId = null;

        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(user) {
                UserId = user.id;
                return UserProject.create({
                    UserId,
                    ProjectId
                })
            } else {
                throw ({
                    status : 404,
                    message : 'User not found',
                })
            }
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            next(err)
        })
    }
    
    static addTodoProject(req, res, next) {
        const { title, description, dueDate, } = req.body;
        const ProjectId = req.params.id;

        TodoProject.create({
            title,
            description,
            dueDate,
            status: 'process',
            ProjectId,
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(next)
    }

    static delTodoProject(req, res, next) {
        const id = req.params.id;

        TodoProject.destroy({
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
    }

    static updateTodoProject(req, res, next) {
        const id = req.params.id;
        const { title, description, dueDate, status } = req.body;

        TodoProject.update(
            {
                title,
                description,
                dueDate,
                status,
            },
            {
                where: {
                    id
                }
            }
        )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
    }

    static readAllTodoProject(req, res, next) {
        const id = req.params.id;
        Project.findAll(
            {
                where: {
                    id
                },
                include: TodoProject
            }
        )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
    }
}

module.exports = ProjectController;