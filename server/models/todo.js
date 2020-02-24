'use strict';

const { Model } = require('sequelize').Sequelize
const axios = require('axios')

module.exports = (sequelize, DataTypes) => {

  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title wajib diisi!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Description wajib diisi!'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    status: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Status wajib diisi'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Due date wajib diisi!'
        }
      }
    }
  }, {
    hooks: {
    }, sequelize
  })

  Todo.associate = function (models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};