'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class userProject extends Model { }
  userProject.init({
    ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, { sequelize });
  userProject.associate = function (models) {
    // associations can be defined here
    userProject.belongsTo(models.User)
    userProject.belongsTo(models.Project)
  };
  return userProject;
};