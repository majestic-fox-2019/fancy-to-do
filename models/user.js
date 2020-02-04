'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class User extends Model{}
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { hooks :{
    beforeCreate(user, options){
      user.password = bcrypt.hashSync(user.password, 10)
    }
  },
    sequelize})
  User.associate = function(models) {
  };
  return User;
};