'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Todo extends Model{}
  Todo.init({
    title:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'title must be filled'
        },
        notNull:{
          args:true,
          msg: 'title must be filled'
        }
      }
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'description must be filled'
        },
        notNull:{
          args:true,
          msg: 'description must be filled'
        }
      }
    },  
    status:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'status must be filled'
        },
        notNull:{
          args:true,
          msg: 'status must be filled'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'due_date must be filled'
        },
        notNull:{
          args:true,
          msg: 'due_date must be filled'
        }
      }
    }
  }, {sequelize})
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};