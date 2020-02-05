'use strict';

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class Todo extends Model{


  }

  Todo.init({
    title: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'title cant be empty'
        }
      }
    },
    desc: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'title cant be empty'
        }
      }
    },
    due_date: {
      type : DataTypes.DATE
    },
    status: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
    UserId : {
      type : DataTypes.INTEGER
    }
  }, 
  {sequelize});

  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};