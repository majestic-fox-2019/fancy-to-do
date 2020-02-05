'use strict';

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Todo extends Model { }
  
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title cannot be empty!"
        },
        notEmpty: {
          args: true,
          msg: "Title cannot be empty!"
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: "Please provide proper date format!"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize });

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User);
  };
  
  return Todo;
};