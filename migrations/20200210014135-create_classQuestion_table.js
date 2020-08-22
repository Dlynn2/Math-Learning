'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("class_question", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      classqid: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      classquestion: {
          type:Sequelize.STRING
      },
      answer: {
          type: Sequelize.STRING
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("class_question");
  }
};
