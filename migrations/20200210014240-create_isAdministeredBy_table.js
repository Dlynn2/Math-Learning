'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("is_administered_by", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      adminid: {
          type: Sequelize.INTEGER,
          primaryKey: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("is_administered_by");
  }
};
