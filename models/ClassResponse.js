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
        },
        admin_level: {
            type: Sequelize.INTEGER,
            defaultValue:1
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)