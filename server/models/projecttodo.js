'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class ProjectTodo extends Model { }

  ProjectTodo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: DataTypes.DATE,
    status: DataTypes.STRING,
    ProjectId: DataTypes.INTEGER
  }, {
    sequelize
  });
  ProjectTodo.associate = function (models) {
    // associations can be defined here
    ProjectTodo.belongsTo(models.Project)
  };
  return ProjectTodo;
};