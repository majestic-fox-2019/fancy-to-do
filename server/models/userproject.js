'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define('UserProject', {
    ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  UserProject.associate = function(models) {
    // associations can be defined here
    UserProject.belongsTo(models.User)
    UserProject.belongsTo(models.Project)
  };
  return UserProject;
};