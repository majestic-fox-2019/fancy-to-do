"use strict";
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const axios = require("axios");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Todo extends Model {
    updateTemperature() {
      let d = new Date(this.Due_date);
      let date = (d.getFullYear() - 1970 + d.getMonth() + d.getDate()) * 86400;
      return axios({
        method: "get",
        url: `https://api.darksky.net/forecast/086acaba959b5909474a6ea4e34942ed/42.3601,-71.0589,${date}?exclude=[minutely,hourly,alerts,flags]&units=si`
      }).then(result => {
        this.Temperature = result.data.currently.temperature;
      });
    }
  }
  Todo.init(
    {
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title must be filled"
          }
        }
      },
      Description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description must be filled"
          }
        }
      },
      Status: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: "Status must be filled "
          },
          isIn: {
            args: [[true, false]],
            msg: "Status either true or false"
          }
        }
      },
      Due_date: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
      Temperature: DataTypes.FLOAT
    },
    {
      sequelize,
      hooks: {
        beforeCreate(instance, option) {
          let d = new Date(instance.Due_date);
          let date =
            (d.getFullYear() - 1970 + d.getMonth() + d.getDate()) * 86400;
          return axios({
            method: "get",
            url: `https://api.darksky.net/forecast/086acaba959b5909474a6ea4e34942ed/42.3601,-71.0589,${date}?exclude=[minutely,hourly,alerts,flags]&units=si`
          })
            .then(result => {
              instance.Temperature = result.data.currently.temperature;
            })
            .catch(err => {
              throw err;
            });
        },
        afterFind(instance, option) {
          let arr = [];
          instance.forEach(element => {
            arr.push(element.updateTemperature());
          });
          return Promise.all(arr);
        }
      }
    }
  );
  Todo.associate = function(models) {
    Todo.belongsTo(models.User);
  };
  return Todo;
};
