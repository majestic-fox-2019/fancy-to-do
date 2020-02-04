'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize;

  class User extends Model{

  }

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {sequelize});

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};