'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Todos', 'UserId', {
      type: Sequelize.STRING
    })

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Todos', 'UserId')

  }
};

