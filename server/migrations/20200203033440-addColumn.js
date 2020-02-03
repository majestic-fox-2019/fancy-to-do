'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Todos', 'due_date', Sequelize.DATE),
      queryInterface.addColumn('Todos', 'status', Sequelize.STRING, {
        defaultValue: 'ongoing'
      }),
      queryInterface.addColumn('Todos', 'ProjectId', Sequelize.INTEGER)
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Todos', 'status'),
      queryInterface.removeColumn('Todos', 'due_date'),
      queryInterface.removeColumn('Todos', 'ProjectId')
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
