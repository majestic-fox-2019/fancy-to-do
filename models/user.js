'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize
  class User extends Model {}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { 
    hooks: {
      beforeCreate(instance, options){
        instance.password = bcrypt.hashSync(instance.password, 10)
      }
    },
    sequelize
  });

  User.associate = function(models) {
    User.hasMany(models.Task)
  };
  return User;
};