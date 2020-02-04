"use strict";

const {Todo} = require('./../models');

function findTodoUserId(idTodo) {
    return Todo.findOne({
            where: {
                id: Number(idTodo)
            }
        })
        .then(todo => {
            return todo.UserId
        })
        .catch(err => {
            return -1;
        });
}

module.exports = {
    findTodoUserId
}