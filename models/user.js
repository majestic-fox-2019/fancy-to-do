'use strict';

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    username: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    }
  }, { hooks : {

    beforeCreate : (instance, options) => {
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(instance.password, salt)
      instance.password = hash
    }

  }
  ,sequelize })

  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};