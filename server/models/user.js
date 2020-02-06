'use strict';
const hashPassword = require("../helpers/hashPassword");
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.Sequelize.Model;
	class User extends Model { };
	User.init({
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Please fill `Email`"
				},
				notEmpty: {
					args: true,
					msg: "Please fill `Email`"
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Please fill `Password`"
				},
				notEmpty: {
					args: true,
					msg: "Please fill `Password`"
				}
			}
		}
	}, {
		hooks: {
			beforeCreate(data) {
				data.password = hashPassword(data.password);
			}
		}, sequelize
	});
	User.associate = function (models) {
		User.belongsToMany(models.Todo, { through: "TodoUsers", as: "users" });
	};
	return User;
};
