const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'CLASS',
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
	StartDate: {
	    type:Sequelize.DATEONLY
	},
	EndDate: {
	    type:Sequelize.DATEONLY
	},
        StartTime: {
            type:Sequelize.TIME
        },
        EndTime: {
            type:Sequelize.TIME
        },
	Days: {
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
