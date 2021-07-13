const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'IS_ADMINISTERED_BY',
    {
        classid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        adminid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },
    {
	freezeTableName: true,
        timestamps: false
    }
)
