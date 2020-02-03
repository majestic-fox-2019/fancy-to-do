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
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "undone"
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize
  })
  
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};