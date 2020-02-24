'use strict'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class ProjectUser extends Model {}

  ProjectUser.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'UserId must not empty'
          }
        },
        allowNull: false
      },
      ProjectId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'UserId must not empty'
          }
        },
        allowNull: false
      }
    },
    { sequelize }
  )
  ProjectUser.associate = function(models) {
    // associations can be defined here
    ProjectUser.belongsTo(models.User)
    ProjectUser.belongsTo(models.Project)
  }
  return ProjectUser
}
