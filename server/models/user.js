'use strict'

const hashed = require('../helpers/login')

module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize 
  
  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty: {
          args : true,
          msg : "Username cannot be empty!"
        }, 
        notNull:{
          msg: "Username cannot be null!"
        }
    }},
    email: {
     type: DataTypes.STRING,
     allowNull: false,
      validate :{
        notEmpty: {
          args : true,
          msg : "email cannot be empty!"
        }, 
        notNull:{
          msg: "email cannot be null!"
        },
        isExist: function(value) {
          return User.count({ where: { email: value } })
            .then(count => {
              if (count != 0) {
                throw new Error('Email is already exist.');
              }
          });
        }
    }},
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty: {
          args : true,
          msg : "Password cannot be empty!"
        }, 
        notNull:{
          msg: "Password cannot be null!"
        }
    }}
  }, { hooks: {
    beforeCreate(user, options){
      user.password = hashed.hashed(user.password, 5)
    }
  },
    sequelize
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};