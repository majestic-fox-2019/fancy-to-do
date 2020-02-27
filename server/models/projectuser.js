'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class ProjectUser extends Model { }
  ProjectUser.init({
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, { sequelize })
  ProjectUser.associate = function (models) {
    // associations can be defined here
    ProjectUser.belongsTo(models.Project)
    ProjectUser.belongsTo(models.User)
  };
  return ProjectUser;
};