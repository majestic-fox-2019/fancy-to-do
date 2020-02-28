'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        },
        isIn: {
          args: [['Not Done', 'Finished', 'Expired']],
          msg: 'Status not found'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    ProjectId: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize
  })

  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
    Todo.belongsTo(models.Project)
  };
  return Todo;
};