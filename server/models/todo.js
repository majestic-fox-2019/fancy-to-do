'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {}
  Todo.init({
    tittle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: { 
      type:DataTypes.STRING,
      allowNull: false 
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, { sequelize });
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};