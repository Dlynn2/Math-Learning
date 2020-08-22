'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("is_enrolled_in", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      classid: {
          type: Sequelize.INTEGER,
          primaryKey: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("is_enrolled_in");
  }
};
