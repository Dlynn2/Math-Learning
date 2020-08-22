'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("class_response", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      timestamp: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      },
      classid: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      classqid: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      classanswer: {
          type: Sequelize.STRING
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("class_response");
  }
};
