'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Todo extends Model {}
  Todo.init({
    tittle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title cannot be empty"
        }
      }
    },
    description: { 
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description cannot be empty"
        }
      } 
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "status cannot be empty"
        },
        isIn: {
          args: [['done', 'not yet']],
          msg: "you must insert done/not yet"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "date cannot be empty"
        }
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId cannot be empty"
        }
      }
    }
  }, { sequelize });
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};