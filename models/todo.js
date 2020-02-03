'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Title must be filled!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Description must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Description must be filled!'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Status must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Status must be filled!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Due date must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Due date must be filled!'
        }
      }
    }
  }, { sequelize })

  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};