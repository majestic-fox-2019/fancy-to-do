'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class MemberProject extends Model { }

  MemberProject.init({
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {
    sequelize
  });
  MemberProject.associate = function (models) {
    // associations can be defined here
  };
  return MemberProject;
};