'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Project extends Model { }

  Project.init({
    nameProject: DataTypes.STRING,
    admin: DataTypes.INTEGER,
    member: DataTypes.INTEGER,
    todo: DataTypes.INTEGER
  }, {
    sequelize
  });
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsTo(models.ProjectTodo)

  };
  return Project;
};