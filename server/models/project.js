'use strict';
module.exports = (sequelize, DataTypes) => {
const { Model } = sequelize.Sequelize

class Project extends Model {}

Project.init({
  name: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['On Progress', 'Finished']],
        msg: 'Status not found'
      }
    }
  }
},{
  sequelize
})

  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsToMany(models.User, {through: models.ProjectUser})
  };
  return Project;
};