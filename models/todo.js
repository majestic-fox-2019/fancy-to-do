'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model {}

  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Enter a title"
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Enter a description"
        }
      }
    },
    status: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Enter a status"
        }
      }
    },
    due_date: {
      type : DataTypes.DATE,
      validate : {
        notEmpty : {
          msg : "Enter a date"
        }
      }
    }
  },{ 
    hooks : {
      beforeCreate(todo ,opt) {
        if(!todo.status){
          todo.status = 'incomplete'
        }
      },
    },
    sequelize 
  })

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};