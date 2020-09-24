'use strict';
module.exports = (sequelize, DataTypes) => {


  const Model = sequelize.Sequelize.Model

  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull : {msg : "title cannot be empty"},
        notEmpty: {msg : "title cannot be empty"}
      }
    },  
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull : {msg : "Description cannot be empty"},
        notEmpty: {msg : "Description cannot be empty"}
      }
    }, 
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  },{sequelize,
    hooks:{
      beforeCreate :(instance,option)=>{
        instance.status = "Not Complete"
      }
    }
  })




  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
    // associations can be defined here
  };
  return Todo;
};