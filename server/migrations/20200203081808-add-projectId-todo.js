'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Todos', 'ProjectId', {
      type: Sequelize.STRING
    })

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Todos', 'ProjectId')

  }
};

