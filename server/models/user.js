'use strict';
const {hashing} = require('../helper/bycript')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty :{
          args: true,
          msg: 'please input username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty :{
          args: true,
          msg: 'please input email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty :{
          args: true,
          msg: 'please input password'
        }
      }
    } 
  },{sequelize,
    hooks: {
      beforeCreate: (user, options)=>{
        user.password = hashing(user.password)
      }
    }
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
    User.belongsToMany(models.Project, { through : 'UserProject' })
  };
  return User;
};