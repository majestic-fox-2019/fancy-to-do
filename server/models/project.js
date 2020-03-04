'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Project extends Model {}

  Project.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required',
        },
        isRequired(value) {
          if(!value) {
            throw new Error('Name is required')
          }
        },
        isUnique(value) {
          return Project.findAll({
            where: {
              name: value
            }
          })
          .then(result => {
            if(result.length !== 0) {
              throw new Error('Project Name is Unique');
            }
          })
        },
      },
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId is required'
        },
        isRequired(value) {
          if(!value) {
            throw new Error('UserId is required');
          }
        },
      },
    },
  }, {
    sequelize
  });
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsToMany(models.User, { through: models.UserProject })
    Project.hasMany(models.TodoProject)
  };
  return Project;
};