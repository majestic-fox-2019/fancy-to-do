'use strict'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Project extends Model {}

  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Project name must not empty'
          }
        },
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Project author must not empty'
          }
        }
      }
    },
    { sequelize }
  )

  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsToMany(models.User, {
      through: models.ProjectUser
    })
  }
  return Project
}
