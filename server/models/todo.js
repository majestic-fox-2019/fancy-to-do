'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Todo extends Model {}

  Todo.init({
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
    }
  }, {
    sequelize
  });
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User);
  };
  return Todo;
};