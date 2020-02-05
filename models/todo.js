'use strict';

const axios = require('axios');

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Title must be filled!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Description must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Description must be filled!'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Status must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Status must be filled!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Due date must be filled!'
        },
        notEmpty: {
          args: true,
          msg: 'Due date must be filled!'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    language: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (todo, options) => {

        return axios({
          headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`
          },
          method: 'post',
          url: 'https://ws.detectlanguage.com/0.2/detect',
          data: {
            'q': `${todo.title} ${todo.description}`
          }
        })
          .then(response => {
            todo.language = response.data.data.detections[0].language
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  })

  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)

  };
  return Todo;
};