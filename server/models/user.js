'use strict'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {}

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: 5,
            msg: 'Username min. 6 characters'
          },
          notEmpty: {
            args: true,
            msg: 'Username must not empty'
          }
        },
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email must not empty'
          },
          isEmail: {
            args: true,
            msg: 'Wrong email format'
          }
        },
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 5,
            msg: 'Password min. 6 characters'
          },
          notEmpty: {
            args: true,
            msg: 'Password must not empty'
          }
        }
      },
      platform: {
        type: DataTypes.ENUM,
        values: ['google', 'normal'],
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Platform is required'
          }
        },
        allowNull: false
      }
    },
    { sequelize }
  )

  User.beforeCreate((user, options) => {
    const hash = require('../helpers/hash')
    return hash(user.password)
      .then((hashedPass) => {
        user.password = hashedPass
      })
      .catch((err) => {
        console.log(err)
      })
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
    User.belongsToMany(models.Project, { through: models.ProjectUser })
  }
  return User
}
