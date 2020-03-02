'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class UserProject extends Model{}
  UserProject.init({
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  },{sequelize})
  UserProject.associate = function(models) {
    // associations can be defined here
    UserProject.belongsTo(models.Project)
  };
  return UserProject;
};