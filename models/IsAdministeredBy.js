const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'is_administered_by',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        adminid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },
    {
        timestamps: false
    }
)