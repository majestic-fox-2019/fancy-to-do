'use strict';

const Todo = require('./../models').Todo;
const {createEvent} = require('../third-parties/google_calendar');

class TodoController {
    static create(req, res, next) {
        const {title, description, status, due_date} = req.body;
        if (!due_date) { // ntah kenapa validasi 
            next({
                statusCode: 400,
                message: "Due date cannot be empty"
            });
        }

        
        Todo.create({
            title, 
            description, 
            status, 
            due_date,
            UserId: req.user.id
        })
        .then(result => {
            let event = {
                'summary': title,
                'location': 'Kampus kesayangan kita yaitu hacktiv8',
                'description': description,
                'start': {
                  'dateTime': new Date(due_date).toISOString(),
                  'timeZone': 'Asia/Jakarta',
                },
                'end': {
                  'dateTime': new Date(due_date).toISOString(),
                  'timeZone': 'Asia/Jakarta',
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                  {'email': req.user.email},
                  {'email': 'kodekite@gmail.com'},
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                  ],
                },
            };

            if (event) {
                createEvent(event);
            }
            res.status(201).json(result);
        })
        .catch(err => {
            next(err);
        })
    }

    static read(req, res, next) {
        Todo
            .findAll({
                where: {
                    UserId: req.user.id
                }
            })
            .then(todos => {
                res.status(200).json(todos);
            })
            .catch(err => {
                next(err);
            });

    }

    static findById(req, res, next) {
        let idTodo = Number(req.params.id);
        Todo
            .findByPk(idTodo)
            .then(todo => {
                if (todo) {
                    res.status(200).json(todo);
                }else{
                    throw {
                        statusCode: 404,
                        message: "No data found"
                    }
                }
            })
            .catch(err => {
                next(err);
            });
    }

    static update(req, res, next) {
        let idTodo = Number(req.params.id);
        const {title, description, status, due_date} = req.body;
        Todo
            .update({
                title,
                description,
                status,
                due_date
            }, {
                where: {
                    id: idTodo
                },
                returning: true
            })
            .then(result => {
                if (result[0]) {
                    res.status(200).json(result[1][0]);
                }else{
                    throw {
                        statusCode: 404,
                        message: "No data found"
                    }
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static delete(req, res, next) {
        let idTodo      = Number(req.params.id);
        let deletedTodo = null;
        Todo
            .findByPk(idTodo)
            .then(todo => {
                deletedTodo = todo;
                return Todo
                    .destroy({
                        where: {
                            id: idTodo
                        }
                    })
            })
            .then(() => {
                if (deletedTodo) {                
                    res.status(200).json(deletedTodo);
                }else{
                    throw {
                        statusCode: 404,
                        message: "No data found"
                    }
                }
            })
            .catch(err => {
                next(err);
            });            
    }


}

module.exports = TodoController;