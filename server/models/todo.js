'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Todo extends Model { }

  Todo.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        notNull: {
          msg: 'Title is required'
        }
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        },
        notNull: {
          msg: 'Description is required'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Due date is required'
        },
        notNull: {
          msg: 'Due date is required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function (instance, options) {
        if (!instance.due_date) {
          instance.due_date = new Date()
        }

        if (!instance.status) {
          instance.status = false
        }
      },
      beforeUpdate: (instance, options) => {
        if (!instance.status) {
          instance.status = false
        }
      }
    }, sequelize
  });

  Todo.associate = function (models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};