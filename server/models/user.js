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
        }
      }
    },
    password: DataTypes.STRING,
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