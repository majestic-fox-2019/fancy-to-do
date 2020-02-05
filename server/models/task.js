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
        notEmpty: true,
        notNull: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    UserId: DataTypes.INTEGER
  }, { 
    hooks: {
      // afterCreate(instance, options){
      //   // console.log(instance)
      //   // console.log({options})
      //   Task.findByPk(instance.id)
      //   .then(result => {
      //     console.log(result, '<<< THEN')
      //   })
      //   .catch(err => {
      //     throw new Error('gagal')
      //   })
      //   // sentEmail('fajrin.noorrachman11@gmail.com', instance.title, instance.description, instance.due_date)
      // }
    }
    ,sequelize});

  Task.associate = function(models) {
    Task.belongsTo(models.User)
  };
  return Task;
};