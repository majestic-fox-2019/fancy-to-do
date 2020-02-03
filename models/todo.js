'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  const helper = require('../helpers/helper')

  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input todo title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input todo description'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['complete', 'incomplete']],
          msg: `Please input todo status complete or incomplete`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: `Please input date formatted value`
        }
      }
    }
  }, { sequelize, hooks: {
    beforeCreate: (todo, option) => {
      if(!todo.status){
        todo.status = 'incomplete'
      }
    },
    afterFind: (todo, option) => {
      if(Array.isArray(todo)){
        todo.forEach(el => {
          el.dataValues.due_date = helper.changeFormatDate(new Date(el.dataValues.due_date))
        })
      } else {
        todo.dataValues.due_date = helper.changeFormatDate(new Date(el.dataValues.due_date))
      }
    }
  } })

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};