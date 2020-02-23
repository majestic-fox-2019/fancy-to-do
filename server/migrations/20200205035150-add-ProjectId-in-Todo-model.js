'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.addColumn('Todos', 'ProjectId',Sequelize.INTEGER );
    },
    
    down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Todos', 'ProjectId');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
