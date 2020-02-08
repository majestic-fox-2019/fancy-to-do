'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model { }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "title must be filled" },
        notEmpty: { msg: "title must be filled" }
      }, allowNull: false
    },
    desctiption: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "description must be filled" },
        notEmpty: { msg: "description must be filled" }
      }, allowNull: false
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notNull: { msg: "due date must be filled" },
        notEmpty: { msg: "due date must be filled" }
      }, allowNull: false
    },
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, { sequelize })

  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
    Todo.belongsTo(models.Project)


  };
  return Todo;
};