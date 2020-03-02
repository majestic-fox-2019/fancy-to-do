'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Project extends Model{}
  Project.init({
    project_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please input project name'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please input project status'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please input due date'
        }
      }
    }
  }, {sequelize})
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsToMany(models.User, { through : 'UserProject' })
    Project.hasMany(models.UserProject)
  };
  return Project;
};