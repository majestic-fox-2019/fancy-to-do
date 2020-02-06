'use strict';
const axios = require('axios');
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize

  class ToDo extends Model{}
  ToDo.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"title must be filled"
        },
        notEmpty:{
          args:true,
          msg:"title must be filled"
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"description must be filled"
        },
        notEmpty:{
          args:true,
          msg:"description must be filled"
        }
      }
      
    },
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"status must be filled"
        },
        notEmpty:{
          args:true,
          msg:"status must be filled"
        }
      }
    },
    due_date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"due_date must be filled"
        },
        notEmpty:{
          args:true,
          msg:"due_date must be filled"
        }
      }
    },
    UserId:{
      type:DataTypes.INTEGER,
    },
    temperature:{
      type:DataTypes.INTEGER
    }
  },{sequelize,hooks:{
    // afterFind:function(user,instance){
    //   console.log(user)
    //   // user.title ='masuk'
    //   user.forEach(el=>{
    //     let date = Math.floor(new Date(el.due_date).getTime()/1000.0)
    //     // el.title='masuk'
    //     return axios({
    //       method: 'get',
    //       url: `https://api.darksky.net/forecast/${process.env.API_key}/-6.267116,106.760727,${date}?exclude=[currently,minutely,hourly]`,
    //     })
    //       .then((data)=> {
    //         // console.log("masuk")
    //         // console.log(data.data)
    //         el.title = "hujan"
    //         // console.log(el)
            
    //       })
    //       .catch(err=>{
    //         console.log('error')
    //       })
    //   })  
    // },
    beforeCreate:function(user,option){
      let date = Math.floor(new Date(user.due_date).getTime()/1000.0)
        // el.title='masuk'
        return axios({
          method: 'get',
          url: `https://api.darksky.net/forecast/${process.env.API_key}/-6.267116,106.760727,${date}?exclude=[minutely,hourly,alerts]&units=si`,
        })
          .then((data)=> {
            // console.log("masuk")
            // console.log(data.data.currently)
            // console.log(data.data)
            // res.send({data:data.data.currently.temperature})
            user.temperature = Math.floor(data.data.currently.temperature)
            // console.log(el)
            
          })
          .catch(err=>{
            console.log('error')
          })
    }

  }})
  
  ToDo.associate = function(models) {
    // associations can be defined here
    ToDo.belongsTo(models.User)
  };
  return ToDo;
};