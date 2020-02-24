'use strict';

const {hasher} = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model{

  }

  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'email is required'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'password is required'
        }
      }
    }
  }, {
    hooks : {
      beforeCreate : (instance, options)=>{
        instance.password = hasher(instance.password)
      }
    },
    sequelize
  });

  User.associate = function(models) {
    User.hasMany(models.Todo, {
      foreignKey : 'UserId'
    })

    User.belongsToMany(models.Project, {
      through : 'UserProject'
    })
  };
  return User;
};