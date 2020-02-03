'use strict';
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
    }
  },{sequelize})
  
  ToDo.associate = function(models) {
    // associations can be defined here
  };
  return ToDo;
};