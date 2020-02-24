'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Project extends Model { }

  Project.init({
    nameProject: DataTypes.STRING,
    Admin: DataTypes.INTEGER
  }, {
    sequelize
  });
  Project.associate = function (models) {
    // associations can be defined here
    Project.hasMany(models.Todo)
    Project.belongsToMany(models.User, { through: models.MemberProject })
  };
  return Project;
};