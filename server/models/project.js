'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Project extends Model {

  }

  Project.init({
    title: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'title cant be empty'
        }
      }
    },
    desc: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'title cant be empty'
        }
      }
    },
    due_date: {
      type : DataTypes.DATE
    },
    status: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
    AuthorId: {
      type : DataTypes.INTEGER,
    }
  }, {sequelize});

  Project.associate = function(models) {
    Project.belongsToMany(models.User, {
      through : 'UserProject'
    })

    Project.hasMany(models.Todo)
  };
  return Project;
};