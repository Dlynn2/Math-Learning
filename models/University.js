const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'university',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        universityName: {
            type: Sequelize.STRING
        },
        timezone: {
            type:Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)