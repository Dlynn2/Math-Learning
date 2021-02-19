const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'UNIVERSITY',
    {
        uid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        universityName: {
            type: Sequelize.STRING
        },
        timezone: {
            type:Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
	freezeTableName: true
    }
)
