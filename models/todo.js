'use strict';

const { Model } = require('sequelize').Sequelize
const axios = require('axios')

module.exports = (sequelize, DataTypes) => {

  class Todo extends Model {}

  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    UserId : DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    due_date: DataTypes.DATE
  }, { hooks : {
  }, sequelize })

  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};