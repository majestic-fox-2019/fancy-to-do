'use strict';
const hashingPassword = require('../helpers/hashingPassword')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "password must be filled" },
        notEmpty: { msg: "password must be filled" }
      }, allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{msg: "format email is wrong"},
        notNull: { msg: "email must be filled" },
        notEmpty: { msg: "email must be filled" }
      }, allowNull: false
    }
  }, {
    sequelize,
      hooks: {
        beforeCreate(user, option) {
          user.password = hashingPassword(user.password)
        }
      }
    })
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo)
    User.belongsToMany(models.Project, { through: models.UserProject })

  };
  return User;
};