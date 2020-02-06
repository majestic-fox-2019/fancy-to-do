'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class UserProject extends Model {}

  UserProject.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId is required',
        },
        isRequired(value) {
          if(!value) {
            throw new Error('UserId is required');
          }
        },
      },
    },
    ProjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'ProjectId is required'
        }
      },
      isRequired(value) {
        if(!value) {
          throw new Error('ProjectId is required');
        }
      },
    },
  }, {
    sequelize
  });
  UserProject.associate = function(models) {
    // associations can be defined here
    UserProject.belongsTo(models.User)
    UserProject.belongsTo(models.Project)
  };
  return UserProject;
};