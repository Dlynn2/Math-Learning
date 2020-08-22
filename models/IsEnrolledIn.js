const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'isenrolledin',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        classid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)