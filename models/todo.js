'use strict';
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
      Due_date: DataTypes.DATE
    },
    {
      sequelize
    })
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};