const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'survey_question',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        surveyqid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        surveyquestion: {
            type:Sequelize.STRING
        },
        range: {
            type: Sequelize.FLOAT
        }
    },
    {
        timestamps: false
    }
)