'use strict'
const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {}
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: {
          message: 'Wrong format'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: {
          args: 6,
          message: 'Minimal 6 character'
        }
      }
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          const hash = hashPass(instance.password)
          instance.password = hash
        }
      },
      sequelize
    }
  )
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
    User.belongsToMany(models.Project, {through: models.UserProject})
  }
  return User
}
