'use strict';
if(process.env.NODE_ENV==="development"){
  require("dotenv").config()
}
const axios = require("axios");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Todo extends Model{}
  Todo.init(
    {
      Title:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Title must be filled"
          }
        }
      },
      Description:{
        type:DataTypes.STRING,
        validate:{
          notEmpty:{
            args:true,
            msg:"Description must be filled"
          }
        }
      },
      Status:{
        type:DataTypes.BOOLEAN,
        validate:{
          notEmpty:
          {
            args:true,
            msg:"Status must be filled "
          },
          isIn:
          {
            args:[[true,false]],
            msg:"Status either true or false"
          }
        }
      },
      Due_date: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
      Temperature: DataTypes.FLOAT
    },
    {
      sequelize,
      hooks:
      {
        beforeCreate(instance,option){
          let lattitude=6.2655;
          let longtitude=106.7843;
            let date = Math.floor(new Date(instance.Due_date).getTime()/1000.0)
            return axios({
              method:"get",
              url: `https://api.darksky.net/forecast/${process.env.API_key}/${lattitude},${longtitude},${date}?exclude=[minutely,hourly,alerts,flags]&units=si`
            })
            .then(result=>{
              instance.Temperature =result.data.currently.temperature;
            })
            .catch(err=>{
              console.log(12)
            })    
        }
        // afterFind(instance,option){
        //   let lattitude=6.2655;
        //   let longtitude=106.7843;
        //   instance.forEach(element => {
        //     let date = Math.floor(new Date(element.Due_date).getTime()/1000.0)
        //     return axios({
        //       method:"get",
        //       url: `https://api.darksky.net/forecast/${process.env.API_key}/${lattitude},${longtitude},${date}?exclude=[minutely,hourly,alerts,flags]`
        //     })
        //     .then(data=>{
        //       console.log(data)
        //       element.description = data;
        //     })
        //     .catch(err=>{
        //       console.log(12)
        //     })
        //   });    
        // }
      }
    })
  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};