'use strict';

const { Model } = require('sequelize').Sequelize

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
    status: DataTypes.INTEGER,
    due_date: DataTypes.DATE
  }, { sequelize })

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};