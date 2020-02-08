'use strict';

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {}

  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Title must be filled'
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Description must be filled'
        }
      }
    },
    status: DataTypes.INTEGER,
    due_date: {
      type : DataTypes.DATE,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Due date must be filled'
        }
      }
    }
  }, 
  {
    sequelize 
  })

  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};