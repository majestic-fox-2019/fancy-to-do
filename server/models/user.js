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
        validate: {
          isUnique(val) {
            return User.findOne({ where: { email: val } }).then(row => {
              if (row) {
                throw 'Email already used'
              }
            })
          },
          isEmail(val) {
            const regex = /\S+@\S+\.\S+/
            if (!regex.test(val)) {
              throw 'Wrong email format'
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min(val) {
            if(val.length < 6) {
              throw 'Minimun length is 6 character'
            }
          }
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
    User.belongsToMany(models.Project, { through: models.UserProject })
  }
  return User
}
