'use strict';
const bcrypt = require('bcrypt');
const errorss = require('http-errors')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model { }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmailUniq(value) {
          return User.findOne({ where: { email: value } })
            .then(resultEmail => {
              if (resultEmail) {
                throw errorss('406', 'Not Acceptable')
              }
            })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    },
    sequelize
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};