'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Name must be filled!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Email must be filled!'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Username must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Username must be filled!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Password must be filled!'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash
      }
    }
  })


  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};