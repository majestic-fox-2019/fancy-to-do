'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "empty title"
        },
        notNull: {
          msg: 'Please enter your title'
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "empty description"
        },
        notNull: {
          msg: 'Please enter your description'
        },
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "empty status"
        },
        notNull: {
          msg: 'Please enter your status'
        },
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "empty due_date"
        },
        notNull: {
          msg: 'Please enter your date'
        },
        isDate: {
          args: true,
          msg: "invalid format date"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {
    sequelize
  });
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.Project)
    Todo.belongsTo(models.User)
  };
  return Todo;
};