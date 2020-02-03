'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize
  
  class Task extends Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    }
  }, {sequelize});

  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};