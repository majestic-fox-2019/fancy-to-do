'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class User extends Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg : "Email already use !"
      },
      validate: {
        isEmail: {
          msg : "Format email wrong"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg : "Enter a Password"
        },
        notNull: {
          msg : "Enter a Password"
        }
      }
    }
  },{
    hooks: {
      beforeCreate(user,opt){
        return bcrypt.hash(user.password, 10).then(function(hash) {
          user.password = hash
        });
      }
    }, 
    sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
    User.hasMany(models.ProjectUser)
    User.belongsToMany(models.Project, { through: models.ProjectUser });
  };
  return User;
};