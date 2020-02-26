'use strict';
module.exports = (sequelize, DataTypes) => {
  const {hashPassword} = require('./../helpers/authentication');
  const {Model} = sequelize.Sequelize;

  class User extends Model{

  }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isExist: function(value) {
          return User.count({ where: { email: value } })
            .then(count => {
              if (count != 0) {
                throw new Error('Email is already exist.');
              }
          });
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty!"
        },
        isEmail: {
          args: true,
          msg: "Email format is invalid, e.g: onesinus231@gmail.com"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot be empty!"
        }        
      }
    },
    token: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options){
        instance.password = hashPassword(instance.password);
      }
    },
    sequelize
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };
  return User;
};