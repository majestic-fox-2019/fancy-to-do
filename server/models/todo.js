'use strict'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model {}
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Todo title must not empty'
          }
        },
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Todo description must not empty'
          }
        },
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM,
        values: ['done', 'doing', 'undone'],
        defaultValue: 'undone',
        validate: {
          notEmpty: {
            args: true,
            msg: 'Todo status must not empty'
          }
        },
        allowNull: false
      },
      due_date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Todo due_date must not empty'
          }
        },
        allowNull: false
      },
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Todo UserId must not empty'
          }
        },
        allowNull: false
      },
      ProjectId: {
        type: DataTypes.INTEGER
      }
    },
    { sequelize }
  )

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  }
  return Todo
}
