'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define('UserProject', {
    ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  UserProject.associate = function(models) {
    // associations can be defined here
    UserProject.hasMany(models.User)
    UserProject.hasMany(models.Project)
  };
  return UserProject;
};