'use strict';
const {getWeather} = require('../helpers/weatherDarkSky')
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Todo extends Model{}
  Todo.init({
    title:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'title must be filled'
        },
        notNull:{
          args:true,
          msg: 'title must be filled'
        }
      }
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'description must be filled'
        },
        notNull:{
          args:true,
          msg: 'description must be filled'
        }
      }
    },  
    status:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'status must be filled'
        },
        notNull:{
          args:true,
          msg: 'status must be filled'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'due_date must be filled'
        },
        notNull:{
          args:true,
          msg: 'due_date must be filled'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'UserId must be filled'
        },
        notNull:{
          args:true,
          msg: 'UserId must be filled'
        }
      }
    }
  }, {
    // hooks:{
    // beforeCreate(instance, option){
    //   console.log(instance.due_date.getTime())
    //   const date = instance.due_date.getTime()

    //   getWeather(date).then(data => {
    //             // console.log(data.data.currently.summary, '<======= ini data')
    //             if (data.data.currently.summary.include('ujan')) {
    //               throw createError(404, 'Hari Hujan, tidak bisa buat todo')
    //             }
    //             // res.status(200).json(data.data)
            // })
            // .catch(err => {
            //   console.log(err, '<======= ini eror')
            //     // next(err)
            // })
      // getWeather(instance.due_date)
      // .then((data) =>{
      //   console.log(data, '<=============CUACA')
      // })
  //   }
  // },
  sequelize})
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};