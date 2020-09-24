'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const bcryptPass = require('../helpers/bcryptPass')
  class User extends Model{}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
            msg: 'name cannot be empty'
        }
      },
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      validate: {
        isUnique: function(value, next){
          User.findOne({
            where: {
              email: value
            }
          })
          .then(result => {
            if(result) {
              next ({message: 'use another email'})
            } else {
              next()
            }
          })
        },
        notNull:{
            msg: 'email cannot be empty'
        },
        isEmail:{
          args: true,
          msg: "email's not valid"
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
            msg: 'password cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeSave: (user, options) => {
        user.password = bcryptPass.hash(user.password)
      }
    }, 
    sequelize 
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};