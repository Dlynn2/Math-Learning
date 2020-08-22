const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'class',
    {
        ClassID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ClassName: {
            type: Sequelize.STRING
        },
        ClassCode: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        StartTime: {
            type:Sequelize.TIME
        },
        EndTime: {
            type:Sequelize.TIME
        },
        Days:{
            type:Sequelize.STRING
        },
        UniversityID: {
            type:Sequelize.INTEGER
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)