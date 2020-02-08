'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: 'title is required' }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: 'description is required' }
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ['todo', 'doing', 'done'],
      defaultValue: 'todo',
      validate: {
        notEmpty: { args: true, msg: 'username is required' }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: { args: true, msg: 'date is required' }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: { args: true, msg: 'date is required' }
      }
    },
    ProjectId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  });
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
    Todo.belongsTo(models.Project)
  };
  return Todo;
};