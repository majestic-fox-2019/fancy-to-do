'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "format email wrong"
        },
        notEmpty: {
          args: true,
          msg: "empty email"
        },
        notNull: {
          msg: 'Please enter your email'
        },
        isUnique(value) {
          return User.findOne({
            where: {
              email: value
            }
          })
            .then((result) => {
              if (result) {
                throw new Error("email already exist")
              }
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "empty password"
        },
        notNull: {
          msg: 'Please enter your password'
        },
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "empty fullname"
        },
        notNull: {
          msg: 'Please enter your fullname'
        },
      }
    },
    picture: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeValidate: (user) => {
        user.password = (hashPassword(user.password))
      }
    },
    sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Project, { through: models.MemberProject })
    User.hasMany(models.Todo)
  };
  return User;
};