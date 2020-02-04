'use strict';
let bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class User extends Model{}
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },{sequelize,hooks:{
    beforeCreate: function(user,options){
      let hash = bcrypt.hashSync(user.password, 10);
      user.password = hash
    }
  }})
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.ToDo)
  };
  return User;
};