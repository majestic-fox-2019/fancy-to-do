'use strict'

const hashed = require('../helpers/login')

module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize 
  
  class User extends Model {}

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { hooks: {
    beforeCreate(user, options){
      user.password = hashed.hashed(user.password, 5)
    }
  },
    sequelize
  });

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};