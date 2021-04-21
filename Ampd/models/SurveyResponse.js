const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'SURVEY_RESPONSE',
    {
	RecordedDate: {
	    type: Sequelize.DATE,
	    defaultValue: Sequelize.NOW
	},
	ObsID: {
	    type: Sequelize.INTEGER
	},
  ResponseId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
  },
  RecipientLastName: {
	    type: Sequelize.STRING,
      defaultValue: null
	},
  RecipientFirstName: {
	    type: Sequelize.STRING,
      defaultValue: null
	},
  RecipientEmail: {
	    type: Sequelize.STRING,
      defaultValue: null
	},
  ClassID: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  Q1_1: {
      type: Sequelize.INTEGER
  },
	Q1_2: {
	    type: Sequelize.INTEGER
	},
	Q1_3: {
	    type: Sequelize.INTEGER
	},
	Q1_4: {
	    type: Sequelize.INTEGER
	},
	Q1_5: {
	    type: Sequelize.INTEGER
	},
  StartTime: {
      type: Sequelize.STRING
  },
  EndTime: {
      type: Sequelize.STRING
  }
    },
    {
	freezeTableName: true,
        timestamps: false
    }
)
