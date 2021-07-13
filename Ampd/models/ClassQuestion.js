const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'class_question',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        classqid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        classquestion: {
            type:Sequelize.STRING
        },
        answer: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)