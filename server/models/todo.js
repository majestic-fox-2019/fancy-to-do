'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Todo = sequelize.define('Todo', {
  //   title: DataTypes.STRING,
  //   description: DataTypes.STRING,
  //   status: DataTypes.STRING,
  //   due_date: DataTypes.DATE
  // }, {});
  const { Model } = sequelize.Sequelize;
  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    due_date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize
  })
  
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};