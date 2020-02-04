'use strict';

const bcrypt = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class User extends Model {}

  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required',
        },
        notFilled(value) {
          if(!value) {
            throw new Error('Name is required');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Use a valid email format',
        },
        isUnique(value) {
          return User.findAll({
            where: {
              email: value
            }
          })
          .then(result => {
            if(result.length !== 0) {
              throw new Error('Email already exist');
            }
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        notFilled(value) {
          if(!value) {
            throw new Error('Password is required');
          }
        },
      },
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.generateHash(user.password);
      },
    },
    sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};