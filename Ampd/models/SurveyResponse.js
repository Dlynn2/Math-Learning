const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'SURVEY_RESPONSE',
    {
        RecordedDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
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
        ClassID: {
            type: Sequelize.STRING,
        },
        StartTime: {
            type:Sequelize.TIME
        },
        EndTime: {
            type:Sequelize.TIME
        },
        ObsID: {
            type: Sequelize.INTEGER
        }
    },
    {
    freezeTableName: true,
    timestamps: false
    }
)