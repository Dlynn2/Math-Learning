const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'SURVEY_RESPONSE',
    {
        UserID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        Timestamp: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        ClassID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Engagement: {
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
