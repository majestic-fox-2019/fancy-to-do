'use strict';
module.exports = (sequelize, DataTypes) => {

  const bcrypt = require('bcryptjs');
  const Model = sequelize.Sequelize.Model
  const salt = bcrypt.genSaltSync(10);
 
  class User extends Model{}

  User.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "name cannot be empty" },
        notEmpty: { msg: "name cannot be empty" }
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {msg : "please insert correct email"},
        notNull: { msg: "email cannot be empty" },
        notEmpty: { msg: "email cannot be empty" }
      }
    }, 
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "password cannot be empty" },
        notEmpty: { msg: "password cannot be empty" }
      }
    }
  },{
    sequelize,
    hooks :{
      beforeCreate: (instance ,options)=>{
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    }
  })


  User.associate = function(models) {
    User.hasMany(models.Todo)
    // associations can be defined here
  };
  return User;
};