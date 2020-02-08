'use strict';
if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const sentEmail = require('../helpers/sentEmail')

module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize
  const User = sequelize.models.User
  
  class Task extends Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is empty.'
        },
        notNull: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description is empty.'
        },
        notNull: true
      }
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Due Date is empty.'
        },
        notNull: true
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options){
        instance.status = false
      }
    },
  sequelize});

  Task.associate = function(models) {
    Task.belongsTo(models.User)
  };
  return Task;
};