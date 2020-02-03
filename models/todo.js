'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const helper = require('../helper/helper')
  class Todo extends Model {}

  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Enter a title"
        },
        notNull : {
          msg : "Enter a title"
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Enter a description"
        },
        notNull : {
          msg : "Enter a description"
        }
      }
    },
    status: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Enter a status"
        },
        isIn : {
          args : ["complete","incomplete"],
          msg : "please input status with complete or incomplete"
        }
      }
    },
    due_date: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Enter a due date"
        },
        notNull : {
          msg : "Enter a due date"
        }
      }
    }
  },{ 
    hooks : {
      afterFind(todo,opt){
        if(Array.isArray(todo)){
          todo.map(el => {
            el.dataValues.due_date = helper.formatDate(new Date(el.due_date))  
            el.dataValues.createdAt = helper.formatDate(new Date(el.createdAt))  
            el.dataValues.updatedAt = helper.formatDate(new Date(el.updatedAt))  
          })
          
        }
      },  
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