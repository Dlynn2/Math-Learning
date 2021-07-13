const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'class_response',
    {
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
    },
    {
        timestamps: false
    }
)