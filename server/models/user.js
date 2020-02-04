'use strict';
module.exports = (sequelize, DataTypes) => {
  const {hashPassword} = require('./../helpers/authentication');
  const {Model} = sequelize.Sequelize;

  class User extends Model{

  }

  User.init({
    email: DataTypes.STRING,
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