'use strict';

const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize
  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is empty.'
        },
        notNull : {
          args : true,
          msg: 'Email cannot be null'
        },
        isExist: (value => {
            return User.count({ where: { email: value}})
              .then(count => {
                if (count != 0){
                  throw new Error('Email already exist.')
                }
              })
        })
      }
    },
    password: DataTypes.STRING
  }, { 
    hooks: {
      beforeCreate(instance, options){
        console.log(instance)
        if (!instance.password){
          instance.password = hashPassword('password')
        } else {
          console.log(instance.password)
          instance.password = hashPassword(instance.password)
        }
      }
    },
    sequelize
  });

  User.associate = function(models) {
    User.hasMany(models.Task)
  };
  return User;
};