'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class ProjectUser extends Model {}

  ProjectUser.init({
    ProjectId: {
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  },{
    sequelize
  })
  
  ProjectUser.associate = function(models) {
    // associations can be defined here
    ProjectUser.belongsTo(models.User)
    ProjectUser.belongsTo(models.Project)
  };
  return ProjectUser;
};