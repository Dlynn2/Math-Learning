'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("account", {
      userid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fName: {
          type: Sequelize.STRING
      },
      lName: {
          type: Sequelize.STRING
      },
      username: {
          type: Sequelize.STRING,
      },
      passwordHash: {
          type: Sequelize.STRING
      },
      accountType: {
          type: Sequelize.INTEGER
      },
      createdTimestamp: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      },
      consentBool: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("account");
  }
};
