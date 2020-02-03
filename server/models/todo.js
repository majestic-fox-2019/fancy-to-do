'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "name is required" },
        notEmpty: { msg: "name is required" }
      },
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "description is required" },
        notEmpty: { msg: "description is required" }
      },
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notNull: { msg: "description is required" },
        notEmpty: { msg: "description is required" }
      },
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    ProjectId: {
      type: DataTypes.INTEGER
    }
  }, { sequelize })

  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
    Todo.belongsTo(models.Project)

  };
  return Todo;
};