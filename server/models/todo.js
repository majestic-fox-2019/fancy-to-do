'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.Sequelize.Model;
	class Todo extends Model { };
	Todo.init({
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Please fill `Title`"
				},
				notEmpty: {
					args: true,
					msg: "Please fill `Title`"
				}
			}
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Please fill `Description`"
				},
				notEmpty: {
					args: true,
					msg: "Please fill `Description`"
				}
			}
		},
		status: DataTypes.BOOLEAN,
		due_date: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Please fill `Due Date`"
				},
				notEmpty: {
					args: true,
					msg: "Please fill `Due Date`"
				},
				checkDate(val) {
					if (new Date(val) < Date.now()) {
						throw new Error("Date can't be in the past!");
					}
				}
			}
		},
		UserId: DataTypes.INTEGER
	}, {
		hooks: {
			beforeCreate: (data) => {
				if (data.status == null || !data.status) {
					data.status = false;
				}
			},
			beforeUpdate: () => {
				if (data.status == null || !data.status) {
					data.status = false;
				}
			}
		},
		sequelize
	});
	Todo.associate = function (models) {
		Todo.belongsToMany(models.User, { through: "TodoUsers", as: "todos" });
	};
	return Todo;
};
