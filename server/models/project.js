'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Project extends Model { }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'projectname is required' }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'projectname is required' }
      }
    }

  }, { sequelize });
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsToMany(models.User, {
      through: models.userProject
    })
    Project.hasMany(models.Todo)
  };
  return Project;
};