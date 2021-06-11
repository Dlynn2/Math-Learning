const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'IS_ENROLLED_IN',
    {
        StudentID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        ClassID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Phonenumber: {
            type: Sequelize.STRING,
        }
    },
    {
	freezeTableName: true,
        timestamps: false
    }
)
