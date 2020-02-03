'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {}

  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Title must be filled'
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Description must be filled'
        }
      }
    },
    status: DataTypes.INTEGER,
    due_date: DataTypes.DATE
  }, { sequelize })

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};