'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

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
    beforeCreate: (instance, option) => {
      if(!instance.status){
        instance.status = 'incomplete'
      }
    }
  } })

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};