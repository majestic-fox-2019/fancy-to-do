'use strict';
const User = require('../models').User
const email = require('../helpers/api')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {}


  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty: {
          args : true,
          msg : "Title cannot be empty!"
        }, 
        notNull:{
          msg: "Title cannot be null!"
        }
    }},
    description: {
      type : DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty: {
          args : true,
          msg : "Description cannot be empty!"
        }, 
        notNull:{
          msg: "Description cannot be null!"
        }
      }
    },

    status: {
      type : DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty: {
          args : true,
          msg : "Status cannot be empty!"
        }, 
        notNull:{
          msg: "Status cannot be null!"
        }
    }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Date cannot be empty!"
        },
        isDate: {
          args: true,
          msg: "Input date invalid.... (YYYY-MM-DD)"
        }, 
        notNull:{
          msg: "Due_date cannot be null!"
        }
      }
    }
  }, {
        sequelize
      });

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};