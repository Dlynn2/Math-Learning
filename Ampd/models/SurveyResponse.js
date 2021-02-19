const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'SURVEY_RESPONSE',
    {
	Timestamp: {
	    type: Sequelize.DATE,
	    defaultValue: Sequelize.NOW
	},
	ObsID: {
	    type: Sequelize.INTEGER
	},
        UserID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        ClassID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Concentration: {
            type: Sequelize.INTEGER
        },
	Enjoyment: {
	    type: Sequelize.INTEGER
	},
	Interest: {
	    type: Sequelize.INTEGER
	},
	Challenge: {
	    type: Sequelize.INTEGER
	},
	Skill: {
	    type: Sequelize.INTEGER
	}
    },
    {
	freezeTableName: true,
        timestamps: false
    }
)
