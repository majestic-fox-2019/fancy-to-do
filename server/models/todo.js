'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model { }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'kolom title ga boleh kosong' },
        notEmpty: { args: true, msg: 'kolom title ga boleh kosong' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'kolom description ga boleh kosong' },
        notEmpty: { args: true, msg: 'kolom description ga boleh kosong' }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'kolom status ga boleh kosong' },
        notEmpty: { args: true, msg: 'kolom status ga boleh kosong' }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'kolom Date ga boleh kosong' },
        notEmpty: { args: true, msg: 'kolom Date ga boleh kosong' }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize })

  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};