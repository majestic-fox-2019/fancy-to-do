'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Project extends Model {}
  Project.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Enter a name"
        }
      }
    },
    owner: DataTypes.INTEGER,
    due_date: {
      type : DataTypes.DATE,
      validate : {
        notEmpty : {
          msg : "Enter a due date"
        }
      }
    }
  },{
    sequelize
  });
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsToMany(models.User, { through: models.ProjectUser });
    Project.hasMany(models.ProjectUser)
  };
  return Project;
};