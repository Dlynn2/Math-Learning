'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("survey_response", {
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
      surveyqid: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      surveyanswer: {
          type: Sequelize.FLOAT
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("survey_response");
  }
};
