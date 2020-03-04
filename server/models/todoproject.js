'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class TodoProject extends Model {}

  TodoProject.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        isRequired(value) {
          if(!value) {
            throw new Error('Title is required');
          }
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        isRequired(value) {
          if(!value) {
            throw new Error('Description is required');
          }
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'process',
      validate: {
        notNull: {
          msg: 'Status is required'
        },
        isRequired(value) {
          if(!value) {
            throw new Error('Status is required');
          }
        },
      },
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    ProjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'ProjectId is required'
        },
        isRequired(value) {
          if(!value) {
            throw new Error('ProjectId is required');
          }
        },
      },
    },
  }, {
    sequelize
  });
  TodoProject.associate = function(models) {
    // associations can be defined here
    TodoProject.belongsTo(models.Project)
  };
  return TodoProject;
};