'use strict';
const hashPassword = require('../helpers/hashPassword')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model{}

  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      isEmail: {
        msg: 'Please use the correct email format'
      },
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        },
        len: {
          args: 5,
          msg: 'Password must be at least 6 characters'
        }
      }
      
    }
  }, {
    hooks: {
      beforeCreate(instance) {
      return hashPassword(instance.dataValues.password)
      .then(hashedPass => {
        instance.dataValues.password = hashedPass
        // console.log(User.password);
      })
      .catch(err => {
        console.log(err)
      })
      }
    },
    sequelize
  })

  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};